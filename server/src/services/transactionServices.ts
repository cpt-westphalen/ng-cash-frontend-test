import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { Transaction, TransactionType } from "../models/Transaction";
import { AccountServicesI } from "./accountServices";
import { UserServicesI } from "./userServices";

type frontendTransactionType = {
	transaction_id: string;
	from_username: string;
	to_username: string;
	amount: number;
	created_at: string;
};

interface TransactionServicesI {
	create: ({}: {
		to_id: string;
		from_id: string;
		amount: number;
	}) => Promise<TransactionType | null>;
}

export class TransactionServices implements TransactionServicesI {
	private userServices: UserServicesI;
	private accountServices: AccountServicesI;

	constructor(
		userServices: UserServicesI,
		accountServices: AccountServicesI
	) {
		this.accountServices = accountServices;
		this.userServices = userServices;
	}

	public async create({
		to_id,
		from_id,
		amount,
	}: {
		to_id: string;
		from_id: string;
		amount: number;
	}) {
		if (uuidValidate(to_id) && uuidValidate(from_id) && amount > 0) {
			const transaction_id = uuidv4();
			const transaction: TransactionType = {
				transaction_id,
				to: to_id,
				from: from_id,
				amount,
				created_at: new Date().toISOString(),
			};
			const newTransaction = await Transaction.create(transaction);
			return newTransaction;
		} else {
			return null;
		}
	}

	public async replaceIdsWithUsernames(transaction: TransactionType) {
		const { transaction_id, amount, created_at } = transaction;
		const to_id = transaction.to;
		const from_id = transaction.from;
		const to_user = await this.userServices.findByAccountId(to_id);
		const from_user = await this.userServices.findByAccountId(from_id);
		if (to_user && from_user) {
			const frontendTransaction: frontendTransactionType = {
				from_username: from_user.username,
				to_username: to_user.username,
				transaction_id,
				amount,
				created_at,
			};
			return frontendTransaction;
		} else {
			return null;
		}
	}

	public async addTransactionToParties(transaction: TransactionType) {
		const from_user = await this.userServices.findByAccountId(
			transaction.from
		);
		const to_user = await this.userServices.findByAccountId(transaction.to);
		if (!from_user || !to_user) return false;

		const from_account = await this.accountServices.getById(
			from_user.account_id
		);
		const to_account = await this.accountServices.getById(
			to_user.account_id
		);
		if (!from_account || !to_account) return false;

		if (
			!(await this.accountServices.addTransaction({
				transaction,
				account: from_account,
			}))
		) {
			return false;
		}

		if (
			!(await this.accountServices.addTransaction({
				transaction,
				account: to_account,
			}))
		) {
			this.accountServices.deleteLatestTransactionFromHistory(
				from_user.user_id
			);
			return false;
		}
		return true;
	}
}

import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { Transaction, TransactionType } from "../models/Transaction";
import { AccountServicesI } from "./accountServices";
import { UserServicesI } from "./userServices";

type frontendTransactionType = {
	transaction_id: string;
	from: string;
	to: string;
	amount: number;
	created_at: string;
};

interface TransactionServicesI {
	create: (
		to_id: string,
		from_id: string,
		amount: number
	) => Promise<TransactionType | null>;
}

export class TransactionServices implements TransactionServicesI {
	userServices: UserServicesI;
	accountServices: AccountServicesI;

	constructor(
		userServices: UserServicesI,
		accountServices: AccountServicesI
	) {
		this.accountServices = accountServices;
		this.userServices = userServices;
	}

	create = async (to_id: string, from_id: string, amount: number) => {
		if (uuidValidate(to_id) && uuidValidate(from_id) && amount > 0) {
			const transaction_id = uuidv4();
			const transaction: TransactionType = {
				transaction_id,
				to: to_id,
				from: from_id,
				amount,
			};
			const newTransaction = await Transaction.create(transaction);
			return newTransaction;
		} else {
			return null;
		}
	};

	replaceIdsWithUsernames = (transaction: TransactionType) => {
		const { transaction_id, amount } = transaction;
		const to_id = transaction.to;
		const from_id = transaction.from;
		// find user by id and return transaction where to is username and from is username
	};
}

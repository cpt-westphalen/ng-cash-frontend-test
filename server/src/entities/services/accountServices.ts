import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { NEW_USER_BALANCE } from "../../config/newUserBalance.config";
import { Account, AccountType } from "../Account";
import { TransactionType } from "../Transaction";

export interface AccountServicesI {
	create: (user_id: string) => Promise<AccountType | null>;
	getBalanceByAccountId: (account_id: string) => Promise<number | null>;
	getById: (account_id: string) => Promise<AccountType | null>;
	addTransaction: ({}: {
		transaction: TransactionType;
		account: AccountType;
	}) => Promise<boolean>;

	deleteLatestTransactionFromHistory: (
		account_id: string
	) => Promise<boolean>;
}

export const accountServices: AccountServicesI = {
	async create(user_id: string) {
		if (uuidValidate(user_id)) {
			const account_id = uuidv4();
			const balance = NEW_USER_BALANCE;
			const transaction_ids: string[] = [];
			const account: AccountType = {
				user_id,
				account_id,
				balance,
				transaction_ids,
			};
			const safeNewAccount = await Account.create(account);
			if (safeNewAccount) return safeNewAccount;
		}
		return null;
	},

	async getById(account_id: string) {
		if (uuidValidate(account_id)) {
			return (await Account.findById(account_id)) || null;
		}
		return null;
	},

	async getBalanceByAccountId(account_id: string) {
		if (uuidValidate(account_id)) {
			const balance = await Account.getBalance(account_id);
			return balance;
		}
		return null;
	},

	async addTransaction({
		transaction: { transaction_id, from, to, amount },
		account: { account_id, balance },
	}: {
		transaction: TransactionType;
		account: AccountType;
	}) {
		if (uuidValidate(account_id) && uuidValidate(transaction_id)) {
			const updatedBalance =
				account_id == from ? balance - amount : balance + amount;
			await Account.updateBalance({
				account_id,
				balance: updatedBalance,
			});
			await Account.addTransactionToHistory({
				account_id,
				transaction_id,
			});
			return true;
		}
		return false;
	},

	async deleteLatestTransactionFromHistory(account_id) {
		if (uuidValidate(account_id)) {
			return await Account.deleteLatestTransactionFromHistory(account_id);
		} else {
			return false;
		}
	},
};

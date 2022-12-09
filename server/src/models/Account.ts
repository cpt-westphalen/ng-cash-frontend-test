import { DbAccountType } from "../mocks/accounts.db";
import db from "../mocks/db";

export interface AccountType {
	account_id: string;
	balance: number;
	transaction_ids: string[];
}

export class Account {
	static async create(account: AccountType) {
		const created_at = new Date().toISOString();
		const updated_at = new Date().toISOString();
		const newAccount: DbAccountType = {
			...account,
			created_at,
			updated_at,
		};
		db.accounts.push(newAccount);
		return account;
	}

	static async getBalance(account_id: string) {
		const account = db.accounts.find(
			(account) => account.account_id === account_id
		);

		return account ? account.balance : null;
	}
}

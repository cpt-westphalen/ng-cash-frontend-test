import { DbAccountType } from "../mocks/accounts.db";
import db from "../mocks/db";

export interface AccountType {
	account_id: string;
	balance: number;
	transaction_ids: string[];
	user_id: string;
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

	static async findById(account_id: string) {
		return db.accounts.find((acc) => acc.account_id === account_id);
	}
	static async getBalance(account_id: string) {
		const account = db.accounts.find(
			(account) => account.account_id === account_id
		);

		return account ? account.balance : null;
	}

	static async updateBalance({
		account_id,
		balance,
	}: {
		account_id: string;
		balance: number;
	}) {
		const account = db.accounts.find(
			(acc) => acc.account_id === account_id
		);
		if (account) {
			account.balance = balance;
			return balance;
		}
		return null;
	}

	static async addTransactionToHistory({
		account_id,
		transaction_id,
	}: {
		account_id: string;
		transaction_id: string;
	}) {
		const acc = db.accounts.find((acc) => acc.account_id === account_id);
		if (acc) acc.transaction_ids.unshift(transaction_id);
	}
	static async deleteLatestTransactionFromHistory(account_id: string) {
		const acc = db.accounts.find((acc) => acc.account_id === account_id);
		if (acc) {
			acc.transaction_ids.shift();
			return true;
		}
		return false;
	}
}

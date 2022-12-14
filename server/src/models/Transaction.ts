import db from "../mocks/db";
import { DbTransactionType } from "../mocks/transactions.db";

export interface TransactionType {
	transaction_id: string;
	to: string;
	from: string;
	amount: number;
}

export class Transaction {
	public static async create(transaction: TransactionType) {
		const created_at = new Date().toISOString();
		const updated_at = new Date().toISOString();
		const newTransaction: DbTransactionType = {
			...transaction,
			created_at,
			updated_at,
		};
		db.transactions.push(newTransaction);
		return transaction;
	}

	public static async getByIdArray(transaction_ids: string[]) {
		const transactions = transaction_ids.map((transaction_id) =>
			db.transactions.find(
				(transaction) => transaction.transaction_id === transaction_id
			)
		);
		return transactions;
	}
}

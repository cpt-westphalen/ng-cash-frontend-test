import { TransactionType } from "../entities/Transaction";

export interface DbTransactionType extends TransactionType {
	transaction_id: string;
	from: string;
	to: string;
	amount: number;
	created_at: string;
	updated_at: string;
}

export const transactions_db: DbTransactionType[] = [];

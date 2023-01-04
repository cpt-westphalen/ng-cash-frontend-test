import { _Transaction } from "../../models/_Transaction";

export type HttpTransaction = {
	transaction_id: string;
	from_username: string;
	to_username: string;
	amount: number;
	created_at: string;
};

export class TransactionMapper {
	constructor() {}
	static fromTransactionToHTTP(transaction: _Transaction): HttpTransaction {
		const httpTransaction: HttpTransaction = {
			from_username: transaction.fromUsername,
			to_username: transaction.toUsername,
			amount: transaction.amount,
			created_at: transaction.created_at.toISOString(),
			transaction_id: transaction.id,
		};
		return httpTransaction;
	}
}

import { Transaction } from "@prisma/client";
import { MinimalSafeUser, _Transaction } from "../../models/_Transaction";

export type HttpTransaction = {
	transaction_id: string;
	from_username: string;
	to_username: string;
	amount: number;
	created_at: string;
};

export type HttpTransactionRequest = {
	from: string;
	to: string;
	amount: number;
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
	static toPrisma(transaction: _Transaction): Transaction {
		const prismaTransaction: Transaction = {
			transactionId: transaction.id,
			debitedAccountId: transaction.debitedAccountId,
			creditedAccountId: transaction.creditedAccountId,
			value: transaction.amount,
			createdAt: transaction.created_at,
		};
		return prismaTransaction;
	}
}

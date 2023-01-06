import { Transaction } from "@prisma/client";
import { _Transaction } from "../models/_Transaction";

export abstract class TransactionRepository {
	abstract getAll(): Promise<Transaction[]>;
	abstract getById(transactionId: string): Promise<_Transaction | null>;
	abstract getByIdArray(ids: string[]): Promise<_Transaction[] | null>;
	abstract getByAccountId(accountId: string): Promise<_Transaction[] | null>;
	abstract create(transaction: _Transaction): Promise<_Transaction | null>;
}

import { _Transaction } from "../models/_Transaction";

export abstract class TransactionRepository {
	abstract getById(transactionId: string): Promise<_Transaction>;
	abstract getByIdArray(ids: string[]): Promise<_Transaction[]>;
	abstract getByAccountId(accountId: string): Promise<_Transaction[]>;
	abstract create(transaction: _Transaction): Promise<_Transaction>;
}

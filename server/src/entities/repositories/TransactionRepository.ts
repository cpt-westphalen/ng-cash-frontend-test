import { _Transaction } from "../models/_Transaction";

export abstract class TransactionRepository {
	abstract getByAccountId(): Promise<_Transaction[]>;
	abstract getByIdArray(): Promise<_Transaction[]>;
	abstract create(): Promise<_Transaction>;
}

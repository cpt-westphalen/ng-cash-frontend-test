import { Transaction } from "@prisma/client";
import { _Account } from "../models/_Account";
import { _Transaction } from "../models/_Transaction";

export abstract class AccountRepository {
	abstract findById(accountId: string): Promise<_Account | null>;
	abstract getBalance(accountId: string): Promise<number | null>;
	abstract getTransactions(accountId: string): Promise<Transaction[] | null>;
	abstract create(account: _Account): Promise<_Account>;
}

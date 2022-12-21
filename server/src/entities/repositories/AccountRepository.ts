import { _Account } from "../models/_Account";

export abstract class AccountRepository {
	abstract findById(accountId: string): Promise<_Account>;
	abstract getBalance(accountId: string): Promise<number>;
	abstract updateBalance(accountId: string, value: number): Promise<number>;
}

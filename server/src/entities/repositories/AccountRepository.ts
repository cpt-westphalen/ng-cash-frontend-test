import { _Account } from "../models/_Account";

export abstract class AccountRepository {
	abstract create(account: _Account): Promise<_Account>;
	abstract findById(accountId: string): Promise<_Account | null>;
	abstract getBalance(accountId: string): Promise<number | null>;
}

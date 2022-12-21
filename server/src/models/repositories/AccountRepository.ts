import { _Account } from "../_Account";

export abstract class AccountRepository {
	abstract findById(): Promise<_Account>;
	abstract getBalance(): Promise<number>;
	abstract updateBalance(): Promise<number>;
}

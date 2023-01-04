import { _Account } from "../models/_Account";
import { AccountRepository } from "../repositories/AccountRepository";

export class AccountServices {
	constructor(private accountRepository: AccountRepository) {}

	async findById(accountId: string): Promise<_Account | null> {
		const account = await this.accountRepository.findById(accountId);
		return account || null;
	}

	async getBalance(account: _Account): Promise<number | null> {
		const balance = await this.accountRepository.getBalance(account.id);
		return balance || null;
	}

	async updateBalance(account: _Account, value: number): Promise<number> {
		const newBalance = this.accountRepository.updateBalance(
			account.id,
			value
		);
		if (newBalance === undefined) {
			throw new Error("Something went wrong");
		}
		return newBalance;
	}
}

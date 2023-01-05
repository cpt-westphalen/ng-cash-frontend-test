import { randomUUID } from "crypto";
import { _Account } from "../models/_Account";
import { AccountRepository } from "../repositories/AccountRepository";

export class AccountServices {
	constructor(private accountRepository: AccountRepository) {}

	async create(): Promise<_Account | null> {
		const account_id = randomUUID();
		const account = new _Account(account_id);
		return await this.accountRepository.create(account);
	}

	async findById(accountId: string): Promise<_Account | null> {
		const account = await this.accountRepository.findById(accountId);
		return account;
	}

	async getBalance(accountId: string): Promise<number | null> {
		const balance = await this.accountRepository.getBalance(accountId);
		return balance;
	}
}

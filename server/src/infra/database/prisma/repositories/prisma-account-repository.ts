import { PrismaClient } from "@prisma/client";
import { AccountRepository } from "../../../../entities/repositories/AccountRepository";
import { _Account } from "../../../../entities/models/_Account";
import { _User } from "../../../../entities/models/_User";
import { PrismaMappers } from "./mappers/prisma-mappers";

export class PrismaAccountRepository implements AccountRepository {
	constructor(private prismaService: PrismaClient) {}
	async create(account: _Account): Promise<_Account> {
		const prismaAccount = await this.prismaService.account.create({
			data: {
				accountId: account.id,
				balance: account.balance,
			},
		});
		return PrismaMappers.toServerAccount(prismaAccount);
	}
	async findById(accountId: string): Promise<_Account | null> {
		const prismaAccount = await this.prismaService.account.findFirst({
			where: {
				accountId,
			},
		});
		return prismaAccount
			? PrismaMappers.toServerAccount(prismaAccount)
			: null;
	}
	async getBalance(accountId: string): Promise<number | null> {
		const query = await this.prismaService.account.findFirst({
			where: { accountId },
			select: { balance: true },
		});
		return query ? query.balance : null;
	}
}

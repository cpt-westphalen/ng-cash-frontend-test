import { PrismaClient, Transaction } from "@prisma/client";
import { AccountRepository } from "../../../../entities/repositories/AccountRepository";
import { _Account } from "../../../../entities/models/_Account";
import { _User } from "../../../../entities/models/_User";
import { PrismaMappers } from "./mappers/prisma-mappers";
import { _Transaction } from "../../../../entities/models/_Transaction";

export class PrismaAccountRepository implements AccountRepository {
	constructor(private prismaService: PrismaClient) {}

	async getTransactions(accountId: string): Promise<Transaction[] | null> {
		const accountWithTransactions =
			await this.prismaService.account.findUnique({
				where: { accountId },
				include: {
					receivedTransactions: {
						orderBy: { createdAt: "desc" },
						include: {
							debitedAccount: {
								select: {
									owner: { select: { username: true } },
								},
							},
						},
					},
					sentTransactions: {
						orderBy: { createdAt: "desc" },
						include: {
							creditedAccount: {
								select: {
									owner: { select: { username: true } },
								},
							},
						},
					},
				},
			});
		if (!accountWithTransactions) return null;
		const prismaTransactions = ([] as Transaction[]).concat(
			accountWithTransactions.receivedTransactions,
			accountWithTransactions.sentTransactions
		);

		return prismaTransactions;
	}

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

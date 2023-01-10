import { Account, PrismaClient, Transaction, User } from "@prisma/client";
import { AccountRepository } from "../../../../entities/repositories/AccountRepository";
import { _Account } from "../../../../entities/models/_Account";
import { _User } from "../../../../entities/models/_User";
import { PrismaMappers } from "./mappers/prisma-mappers";
import {
	MinimalSafeUser,
	_Transaction,
} from "../../../../entities/models/_Transaction";

export interface ExtendedTransaction extends Transaction {
	debitedAccount?: Account & { owner: User | null };
	creditedAccount?: Account & { owner: User | null };
}

export class PrismaAccountRepository implements AccountRepository {
	constructor(private prismaService: PrismaClient) {}

	async getTransactions(accountId: string): Promise<_Transaction[] | null> {
		const accountWithTransactions =
			await this.prismaService.account.findUnique({
				where: { accountId },
				include: {
					owner: true,
					receivedTransactions: {
						orderBy: { createdAt: "desc" },
						include: {
							debitedAccount: { include: { owner: true } },
						},
					},
					sentTransactions: {
						orderBy: { createdAt: "desc" },
						include: {
							creditedAccount: { include: { owner: true } },
						},
					},
				},
			});
		if (!accountWithTransactions || !accountWithTransactions.owner)
			return null;
		const rootUser: MinimalSafeUser = {
			id: accountWithTransactions.owner.userId,
			username: accountWithTransactions.owner.username,
			account: { id: accountWithTransactions.accountId },
		};
		const prismaTransactions = ([] as ExtendedTransaction[]).concat(
			accountWithTransactions.sentTransactions,
			accountWithTransactions.receivedTransactions
		);
		const transactions = prismaTransactions.map((t) =>
			PrismaMappers.fromExtendedTransactionToServerTransaction(
				t,
				rootUser
			)
		);
		return transactions;
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

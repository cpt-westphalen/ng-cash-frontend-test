import { PrismaClient, Transaction } from "@prisma/client";

import { _Transaction } from "../../../../entities/models/_Transaction";

import { TransactionRepository } from "../../../../entities/repositories/TransactionRepository";

import { TransactionMapper } from "../../../../entities/services/mappers/transaction-mappers";
import { UserMappers } from "../../../../entities/services/mappers/user-mappers";

import { prismaService } from "../prismaService";

export type PrismaTransaction = {
	transactionId: string;
	value: number;
	createdAt: Date;
	creditedAccountId: string;
	debitedAccountId: string;
};

class PrismaTransactionRepository implements TransactionRepository {
	constructor(private prismaService: PrismaClient) {}

	async getAll(): Promise<Transaction[]> {
		return await this.prismaService.transaction.findMany();
	}

	async getById(transactionId: string): Promise<_Transaction | null> {
		const prismaTransaction =
			await this.prismaService.transaction.findUnique({
				where: { transactionId },
			});
		if (!prismaTransaction) return null;
		const [fromUser, toUser] = await this.prismaService.$transaction([
			this.prismaService.user.findUnique({
				where: { accountId: prismaTransaction.debitedAccountId },
			}),
			this.prismaService.user.findUnique({
				where: { accountId: prismaTransaction.creditedAccountId },
			}),
		]);
		if (!fromUser || !toUser) return null;
		const from = UserMappers.fromPrismaToMinimalSafeUser(fromUser);
		const to = UserMappers.fromPrismaToMinimalSafeUser(toUser);
		const amount = prismaTransaction.value;
		const created_at = prismaTransaction.createdAt;
		const transaction = new _Transaction(
			{ from, to, amount, created_at },
			transactionId
		);
		return transaction;
	}
	async getByIdArray(ids: string[]): Promise<_Transaction[]> {
		throw new Error("Method not implemented.");
	}
	async getByAccountId(accountId: string): Promise<_Transaction[]> {
		throw new Error("Method not implemented.");
	}

	async create(transaction: _Transaction): Promise<_Transaction | null> {
		const prismaTransaction = TransactionMapper.toPrisma(transaction);

		const raw = await this.prismaService.$transaction(async (prisma) => {
			const debitedAccountId = transaction.debitedAccountId;
			const creditedAccountId = transaction.creditedAccountId;
			const fromAccount = await prisma.account.update({
				where: { accountId: debitedAccountId },
				data: { balance: { decrement: transaction.amount } },
			});
			if (fromAccount.balance < 0) {
				throw new Error("Insufficient funds");
			}
			const toAccount = await prisma.account.update({
				where: { accountId: creditedAccountId },
				data: { balance: { increment: transaction.amount } },
			});
			if (!toAccount)
				throw new Error("DB Error on Credited Account Balance Update");

			const newTransaction = await prisma.transaction.create({
				data: prismaTransaction,
			});
			if (!newTransaction)
				throw new Error("DB Error on Transaction Create");

			return newTransaction;
		});
		if (!raw) return null;
		return transaction;
	}
}

export const prismaTransactionRepository = new PrismaTransactionRepository(
	prismaService
);

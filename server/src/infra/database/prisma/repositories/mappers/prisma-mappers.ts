import { _Transaction } from "../../../../../entities/models/_Transaction";
import { PrismaTransaction } from "../prisma-repository";

export class PrismaMappers {
	static toPrismaTransaction(transaction: _Transaction): PrismaTransaction {
		const { creditedAccountId, debitedAccountId } = transaction;
		const prismaTransaction: PrismaTransaction = {
			creditedAccountId,
			debitedAccountId,
			transactionId: transaction.id,
			createdAt: transaction.created_at,
			value: transaction.amount,
		};
		return prismaTransaction;
	}
}

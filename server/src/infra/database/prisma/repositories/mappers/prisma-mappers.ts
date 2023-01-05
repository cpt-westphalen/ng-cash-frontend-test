import { Account, Transaction, User } from "@prisma/client";
import { _Transaction } from "../../../../../entities/models/_Transaction";
import { PrismaTransaction } from "../prisma-transaction-repository";
import { _User } from "../../../../../entities/models/_User";
import { _Account } from "../../../../../entities/models/_Account";

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
	static toServerUser(
		prismaUserWithAccount: User & { account: Account }
	): _User {
		const prismaAccount = prismaUserWithAccount.account;
		const account = new _Account(prismaAccount.accountId, {
			balance: prismaAccount.balance,
			transaction_ids: [],
		});
		const user = new _User(
			{
				username: prismaUserWithAccount.username,
				password: prismaUserWithAccount.password,
				account,
			},
			prismaUserWithAccount.userId
		);
		return user;
	}

	static toServerAccount(prismaAccount: Account): _Account {
		const account = new _Account(prismaAccount.accountId, {
			balance: prismaAccount.balance,
			transaction_ids: [],
		});
		return account;
	}
}

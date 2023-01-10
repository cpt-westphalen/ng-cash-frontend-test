import { Account, User } from "@prisma/client";
import {
	MinimalSafeUser,
	_Transaction,
} from "../../../../../entities/models/_Transaction";
import { PrismaTransaction } from "../prisma-transaction-repository";
import { _User } from "../../../../../entities/models/_User";
import { _Account } from "../../../../../entities/models/_Account";
import { ExtendedTransaction } from "../prisma-account-repository";

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

	static fromExtendedTransactionToServerTransaction(
		extendedTransaction: ExtendedTransaction,
		rootUser: MinimalSafeUser
	): _Transaction {
		if (
			!extendedTransaction.creditedAccount &&
			!extendedTransaction.debitedAccount
		) {
			throw new Error(
				"Database Transaction Object Error: No Debited or Credited Account Provided to Prisma Mapper"
			);
		} else if (
			!extendedTransaction.creditedAccount?.owner &&
			!extendedTransaction.debitedAccount?.owner
		) {
			throw new Error(
				"Database Transaction Object Error: No Debited or Credited Account Owner Provided to Prisma Mapper"
			);
		}
		const targetAccount =
			(extendedTransaction.creditedAccount as Account & {
				owner: User;
			}) ??
			(extendedTransaction.debitedAccount as Account & {
				owner: User;
			});

		const id = extendedTransaction.transactionId;
		const amount = extendedTransaction.value;
		const created_at = extendedTransaction.createdAt;
		const from: MinimalSafeUser = rootUser;
		const to: MinimalSafeUser = {
			id: targetAccount.owner.userId,
			username: targetAccount.owner.username,
			account: { id: targetAccount.accountId },
		};
		const transaction = new _Transaction(
			{ to, from, amount, created_at },
			id
		);

		return transaction;
	}
}

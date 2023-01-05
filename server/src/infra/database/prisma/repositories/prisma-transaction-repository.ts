import { PrismaClient } from "@prisma/client";
import { TransactionRepository } from "../../../../entities/repositories/TransactionRepository";
import { _Transaction } from "../../../../entities/models/_Transaction";

export type PrismaTransaction = {
	transactionId: string;
	value: number;
	createdAt: Date;
	creditedAccountId: string;
	debitedAccountId: string;
};

export class PrismaTransactionRepository implements TransactionRepository {
	constructor(private prismaService: PrismaClient) {}
	getById(transactionId: string): Promise<_Transaction> {
		throw new Error("Method not implemented.");
	}
	getByIdArray(ids: string[]): Promise<_Transaction[]> {
		throw new Error("Method not implemented.");
	}
	getByAccountId(accountId: string): Promise<_Transaction[]> {
		throw new Error("Method not implemented.");
	}
	create(transaction: _Transaction): Promise<_Transaction> {
		throw new Error("Method not implemented.");
	}
}

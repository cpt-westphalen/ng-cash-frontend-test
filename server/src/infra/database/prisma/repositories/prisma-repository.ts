import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../../../entities/repositories/UserRepository";
import { TransactionRepository } from "../../../../entities/repositories/TransactionRepository";
import { AccountRepository } from "../../../../entities/repositories/AccountRepository";

export type PrismaTransaction = {
	transactionId: string;
	value: number;
	createdAt: Date;
	creditedAccountId: string;
	debitedAccountId: string;
};

export class PrismaRepository
	implements UserRepository, TransactionRepository, AccountRepository
{
	constructor(private prisma: PrismaClient) {}
}

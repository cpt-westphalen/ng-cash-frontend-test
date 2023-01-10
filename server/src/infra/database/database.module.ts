import { prismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { prismaAccountRepository } from "./prisma/repositories/prisma-account-repository";
import { prismaTransactionRepository } from "./prisma/repositories/prisma-transaction-repository";

export const userRepository = prismaUserRepository;
export const accountRepository = prismaAccountRepository;
export const transactionRepository = prismaTransactionRepository;

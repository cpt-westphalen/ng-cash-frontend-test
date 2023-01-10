import { prismaUserRepository } from "../infra/database/prisma/repositories/prisma-user-repository";
import { prismaAccountRepository } from "../infra/database/prisma/repositories/prisma-account-repository";
import { prismaTransactionRepository } from "../infra/database/prisma/repositories/prisma-transaction-repository";

export const userRepository = prismaUserRepository;
export const accountRepository = prismaAccountRepository;
export const transactionRepository = prismaTransactionRepository;

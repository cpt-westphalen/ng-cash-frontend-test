import { prismaService } from "../infra/database/prisma/prismaService";
import { PrismaUserRepository } from "../infra/database/prisma/repositories/prisma-user-repository";
import { PrismaAccountRepository } from "../infra/database/prisma/repositories/prisma-account-repository";
import { PrismaTransactionRepository } from "../infra/database/prisma/repositories/prisma-transaction-repository";

import { UserServices } from "../entities/services/_UserServices";
import { AccountServices } from "../entities/services/_AccountServices";
import { TransactionServices } from "../entities/services/_TransactionServices";

import { UserController } from "../controllers/_UserController";
import { AccountController } from "../controllers/_AccountController";
import { AuthController } from "../controllers/_AuthController";
import { TransactionController } from "../controllers/TransactionController";

const userRepository = new PrismaUserRepository(prismaService);
const accountRepository = new PrismaAccountRepository(prismaService);
const transactionRepository = new PrismaTransactionRepository(prismaService);

const userServices = new UserServices(userRepository);
const accountServices = new AccountServices(accountRepository);
const transactionServices = new TransactionServices(transactionRepository);

export const userController = new UserController(userServices);
export const accountController = new AccountController(accountServices);
export const authController = new AuthController(accountServices, userServices);
export const transactionController = new TransactionController(
	transactionServices,
	userServices,
	accountServices
);

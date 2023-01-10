import {
	userRepository,
	accountRepository,
	transactionRepository,
} from "./database.module";

import { UserServices } from "../entities/services/_UserServices";
import { AccountServices } from "../entities/services/_AccountServices";
import { TransactionServices } from "../entities/services/_TransactionServices";

import { UserController } from "../controllers/_UserController";
import { AccountController } from "../controllers/_AccountController";
import { AuthController } from "../controllers/_AuthController";
import { TransactionController } from "../controllers/TransactionController";

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

import {
	userRepository,
	accountRepository,
	transactionRepository,
} from "../database/database.module";

import { UserServices } from "../../application/services/UserServices";
import { AccountServices } from "../../application/services/AccountServices";
import { TransactionServices } from "../../application/services/TransactionServices";

import { UserController } from "./controllers/UserController";
import { AccountController } from "./controllers/AccountController";
import { AuthController } from "./controllers/AuthController";
import { TransactionController } from "./controllers/TransactionController";

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

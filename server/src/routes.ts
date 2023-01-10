import { Router } from "express";

import {
	accountController,
	authController,
	userController,
	transactionController,
} from "./infra/http/http.module";

const router = Router();

router.get("/users", (req, res) => userController.getUsers(req, res));
router.get("/transactions", (req, res) =>
	transactionController.getAllTransactions(req, res)
);

router.post("/login", (req, res) => authController.loginUser(req, res));
router.post("/register", (req, res) => authController.createUser(req, res));

router.get("/:account_id/cash", (req, res) =>
	accountController.getAccountBalance(req, res)
);

router.post("/:account_id/send", (req, res) =>
	transactionController.cashOut(req, res)
);

router.get("/:account_id/history", (req, res) =>
	accountController.getTransactionHistory(req, res)
);

export const routes = router;

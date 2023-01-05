import { Router } from "express";
import {
	accountController,
	authController,
	userController,
	transactionController,
} from "../modules/http.module";
import { tokenParser } from "../middleware/tokenParser";

const router = Router();

router.get("/users", (req, res) => userController.getUsers(req, res));

router.post("/login", (req, res) => authController.loginUser(req, res));
router.post("/register", (req, res) => authController.createUser(req, res));

router.use(tokenParser);
router.get("/:account_id/cash", (req, res) =>
	accountController.getAccountBalance(req, res)
);

router.post("/:account_id/cashout", (req, res) =>
	transactionController.cashOut(req, res)
);

export const routes = router;

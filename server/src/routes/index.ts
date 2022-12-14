import { Router } from "express";
import { AccountController } from "../controllers/accountController";
import { UserController } from "../controllers/userController";
import { accountServices } from "../services/accountServices";
import { UserServices } from "../services/userServices";

const router = Router();

const userServices = new UserServices(accountServices);
const userController = new UserController(userServices);
router.get("/users", userController.getUsers);
router.post("/login", userController.loginUser);
router.post("/register", userController.createUser);

const accountController = new AccountController(accountServices, userServices);
router.get("/:account_id/cash", accountController.getAccountBalance);

export const routes = router;

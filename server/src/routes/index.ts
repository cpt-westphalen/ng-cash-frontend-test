import { Router } from "express";
import { getAccountBalance } from "../controllers/accountControllers";
import {
	createUser,
	getUsers,
	loginUser,
} from "../controllers/userControllers";

const router = Router();

router.get("/users", getUsers);
router.post("/login", loginUser);
router.post("/register", createUser);
router.get("/:account_id/cash", getAccountBalance);

export const routes = router;

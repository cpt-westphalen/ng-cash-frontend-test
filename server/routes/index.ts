import { Router } from "express";
import { createUser, getUsers, loginUser } from "../controllers/userController";
// import { controller, controller, controller } from "../controllers/registerControllers";

const router = Router();

router.get("/users", getUsers);
router.post("/login", loginUser);
router.post("/register", createUser);

export const routes = router;

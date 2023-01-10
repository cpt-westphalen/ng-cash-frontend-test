import { Request, Response } from "express";
import { UserServices } from "../../../application/services/UserServices";
import { _User } from "../../../application/models/_User";

export class UserController {
	constructor(private userServices: UserServices) {}

	// @desc Get all registered users from db
	// @route GET /api/users
	// @access Public (but should be private);
	getUsers = async (req: Request, res: Response) => {
		const users = await this.userServices.unsafeGetAll();
		return res.json(users);
	};
}

import { Request, Response } from "express";
import { AccountServices } from "../entities/services/_AccountServices";
import { SafeUser, Token } from "../entities/services/_UserServices";

export class AccountController {
	constructor(private accountServices: AccountServices) {}

	// @desc Get User Account balance
	// @route GET /api/:account_id/cash
	// @access Private
	getAccountBalance = async (req: Request, res: Response) => {
		const user: SafeUser = req.body.user;
		const accountId = req.params.account_id;
		if (accountId != user.account.id) return res.status(403);
		const balance = await this.accountServices.getBalance(accountId);
		return res.status(200).json({ account_id: accountId, balance });
	};
}

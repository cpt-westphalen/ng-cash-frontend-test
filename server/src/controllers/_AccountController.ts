import { Request, Response } from "express";
import { AccountServices } from "../entities/services/_AccountServices";
import { SafeUser } from "../entities/services/_UserServices";
import { validate } from "uuid";

export class AccountController {
	constructor(private accountServices: AccountServices) {}

	// @desc Get User Account balance
	// @route GET /api/:account_id/cash
	// @access Private
	async getAccountBalance(req: Request, res: Response) {
		const user: SafeUser = req.body.user;
		const accountId = req.params.account_id;
		if (!validate(accountId)) return res.status(403).send();
		if (accountId != user.account.id) return res.status(403).send();
		const balance = await this.accountServices.getBalance(accountId);
		return res.status(200).json({ account: { id: accountId, balance } });
	}
}

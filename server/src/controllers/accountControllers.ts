import { NextFunction, Request, Response } from "express";
import { accountServices } from "../services/accountServices";
import { userServices } from "../services/userServices";

// @desc Get User Account balance
// @route GET /api/:account_id/cash
// @access Private
export const getAccountBalance = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bearerToken = req.headers.authorization;
	if (!bearerToken) return res.status(403);
	const token = bearerToken.split(" ")[1];

	const { account_id } = req.params;
	if (!account_id) return res.status(403);

	const user = await userServices
		.parseUserFromTokenTHROWS(token)
		.catch((err) => {
			console.error(err.message);
			res.status(403).json({ message: err.message });
		});

	if (!user) return res.status(403);

	if (user.account_id !== account_id) {
		return res.status(403);
	}
	const balance = await accountServices.getBalanceByAccountId(account_id);
	return res.status(200).json({ account_id, balance });
};

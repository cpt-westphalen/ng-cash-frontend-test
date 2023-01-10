import { Request, Response } from "express";
import { AccountServices } from "../../../application/services/AccountServices";
import { TokenProps } from "../../../application/services/UserServices";
import { validate } from "uuid";
import { TransactionMapper } from "../../../application/services/mappers/transaction-mappers";

export class AccountController {
	constructor(private accountServices: AccountServices) {}

	// @desc Get User Account balance
	// @route GET /api/:account_id/cash
	// @access Private
	async getAccountBalance(req: Request, res: Response) {
		const user: TokenProps | null = req.body.user;
		const accountId = req.params.account_id;
		if (!validate(accountId) || !user) return res.status(403).send();
		if (accountId != user.account.id) return res.status(403).send();
		const balance = await this.accountServices.getBalance(accountId);
		return res.status(200).json({ account: { id: accountId, balance } });
	}

	// @desc Get User Account Transaction History
	// @route GET /api/:account_id/history
	// @access Private
	async getTransactionHistory(req: Request, res: Response) {
		const user: TokenProps | null = req.body.user;
		if (!user) return res.status(403).send();
		const accountId = req.params.account_id;
		if (!accountId || user.account.id !== accountId)
			return res.status(403).send();

		const transactions = await this.accountServices.getTransactions(
			accountId
		);

		if (!transactions) return res.status(404).send();

		const httpTransactions = transactions.map(
			TransactionMapper.fromTransactionToHTTP
		);

		return res.json(httpTransactions);
	}
}

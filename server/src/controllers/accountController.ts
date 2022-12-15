import { Request, Response } from "express";
import { AccountServicesI } from "../services/accountServices";
import { TransactionServices } from "../services/transactionServices";
import { UserServicesI } from "../services/userServices";

export class AccountController {
	accountServices: AccountServicesI;
	userServices: UserServicesI;
	transactionServices: TransactionServices;

	constructor(
		accountServices: AccountServicesI,
		userServices: UserServicesI,
		transactionServices: TransactionServices
	) {
		this.accountServices = accountServices;
		this.userServices = userServices;
		this.transactionServices = transactionServices;
	}

	// @desc Get User Account balance
	// @route GET /api/:account_id/cash
	// @access Private
	getAccountBalance = async (req: Request, res: Response) => {
		const bearerToken = req.headers.authorization;
		if (!bearerToken) return res.status(403).send();
		const token = bearerToken.split(" ")[1];

		const { account_id } = req.params;
		if (!account_id) return res.status(403).send();

		const user = await this.userServices
			.parseUserFromTokenTHROWS(token)
			.catch((err) => {
				console.error(err.message);
				res.status(403).json({ message: err.message });
			});

		if (!user) return res.status(403).send();

		if (user.account_id !== account_id) {
			return res.status(403).send();
		}
		const balance = await this.accountServices.getBalanceByAccountId(
			account_id
		);
		return res.status(200).json({ account_id, balance });
	};

	// @desc Post cashout request -> sending money
	// @route POST /api/:account_id/cashout
	// @access Private
	// @body {from: user_id, to: username, amount: value}
	cashOut = async (req: Request, res: Response) => {
		const bearerToken = req.headers.authorization;
		if (!bearerToken) return res.status(403).send();
		const token = bearerToken.split(" ")[1];

		const { account_id } = req.params;
		if (!account_id) return res.status(403).send();

		const user = await this.userServices
			.parseUserFromTokenTHROWS(token)
			.catch((err) => {
				console.error(err.message);
				res.status(403).json({ message: err.message });
			});

		if (!user) return res.status(403).send();
		if (user.account_id !== account_id) return res.status(403).send();
		// actual controller
		const { from, to, amount } = req.body;
		if (!from || !to || !amount) return res.status(400).send();
		if (user.user_id !== from) return res.status(403).send();

		const to_user = await this.userServices.findByUsername(to);
		if (!to_user) return res.status(404).send();

		const transaction = await this.transactionServices.create({
			from_id: account_id,
			to_id: to_user.account_id,
			amount,
		});
		if (!transaction) return res.status(500).send();
		let isOK = await this.transactionServices.addTransactionToParties(
			transaction
		);
		if (!isOK) return res.status(500).send();
		const frontendTransaction =
			this.transactionServices.replaceIdsWithUsernames(transaction);
		return res.status(200).json({
			message: "Transferência realizada com sucesso!",
			data: frontendTransaction,
		});
	};
}

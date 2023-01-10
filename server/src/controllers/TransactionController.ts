import { Request, Response } from "express";
import { validate } from "uuid";

import { TokenProps, UserServices } from "../entities/services/_UserServices";
import { AccountServices } from "../entities/services/_AccountServices";
import { TransactionServices } from "../entities/services/_TransactionServices";

import { MinimalSafeUser } from "../entities/models/_Transaction";

import {
	HttpTransactionRequest,
	TransactionMapper,
} from "../entities/services/mappers/transaction-mappers";

export class TransactionController {
	constructor(
		private transactionServices: TransactionServices,
		private userServices: UserServices,
		private accountServices: AccountServices
	) {}

	async getAllTransactions(req: Request, res: Response) {
		const transactions = await this.transactionServices.getAll();
		return res.json({ transactions });
	}

	async cashOut(req: Request, res: Response) {
		const user: TokenProps | null = req.body.user;
		const accountId = req.params.account_id;
		const httpTransactionReq: HttpTransactionRequest = req.body;

		const toUsername = httpTransactionReq.to;
		const fromAccountId = httpTransactionReq.from;
		const amount = httpTransactionReq.amount;

		if (
			!user ||
			!validate(accountId) ||
			user.account.id !== accountId ||
			user.account.id !== fromAccountId
		)
			return res.status(402).send();

		const balance = await this.accountServices.getBalance(accountId);

		if (balance == null) return res.status(402).send();
		if (balance < amount)
			return res.status(400).json({ message: "Insufficient funds." });

		const to_user = await this.userServices.unsafeFindByUsername(
			toUsername
		);
		if (to_user == null)
			return res.status(404).json({ message: "Username not found" });

		const from_safeUser: MinimalSafeUser = user;
		const to_safeUser: MinimalSafeUser = {
			id: to_user.id,
			username: to_user.username,
			account: { id: to_user.account.id },
		};

		const transaction = await this.transactionServices.create(
			from_safeUser,
			to_safeUser,
			amount
		);

		if (!transaction)
			return res
				.status(500)
				.json({ message: "Transaction could not be made." });

		const httpTransaction =
			TransactionMapper.fromTransactionToHTTP(transaction);

		return res.json({ message: "Success!", transaction: httpTransaction });
	}
}

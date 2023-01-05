import { Request, Response } from "express";
import { TransactionServices } from "../entities/services/_TransactionServices";

export class TransactionController {
	constructor(private transactionServices: TransactionServices) {}
	async cashOut(req: Request, res: Response) {}
}

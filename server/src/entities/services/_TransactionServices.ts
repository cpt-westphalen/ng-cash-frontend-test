import { _Transaction } from "../models/_Transaction";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class TransactionServices {
	constructor(private transactionRepository: TransactionRepository) {}

	async create(transaction: _Transaction) {}
}

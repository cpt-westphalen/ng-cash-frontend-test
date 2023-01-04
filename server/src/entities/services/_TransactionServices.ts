import { _Transaction } from "../models/_Transaction";
import { _User } from "../models/_User";
import { TransactionRepository } from "../repositories/TransactionRepository";
import {
	HttpTransaction,
	TransactionMapper,
} from "./mappers/transactionMapper";

export class TransactionServices {
	constructor(private transactionRepository: TransactionRepository) {}

	async create(
		from: _User,
		to: _User,
		amount: number,
		created_at?: Date
	): Promise<_Transaction | null> {
		const transaction = new _Transaction({
			from,
			to,
			amount,
			created_at: created_at ?? new Date(),
		});

		const created_transaction = await this.transactionRepository.create(
			transaction
		);

		if (!created_transaction) {
			return null;
		}

		return created_transaction;
	}

	formatForClient(transaction: _Transaction): HttpTransaction {
		return TransactionMapper.fromTransactionToHTTP(transaction);
	}

	async getTransactionDetails(transaction_id: string): Promise<_Transaction> {
		const transaction = await this.transactionRepository.getById(
			transaction_id
		);
		return transaction;
	}

	async getUserTransactions(transaction_ids: string[]) {}
}

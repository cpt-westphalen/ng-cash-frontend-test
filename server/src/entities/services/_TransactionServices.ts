import { _Transaction, MinimalSafeUser } from "../models/_Transaction";
import { _User } from "../models/_User";
import { TransactionRepository } from "../repositories/TransactionRepository";
import {
	HttpTransaction,
	TransactionMapper,
} from "./mappers/transaction-mappers";

export class TransactionServices {
	constructor(private transactionRepository: TransactionRepository) {}

	async getAll() {
		return await this.transactionRepository.getAll();
	}

	async create(
		from: MinimalSafeUser,
		to: MinimalSafeUser,
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

	async getTransactionDetails(
		transaction_id: string
	): Promise<_Transaction | null> {
		const transaction = await this.transactionRepository.getById(
			transaction_id
		);
		return transaction;
	}

	async getUserTransactions(transaction_ids: string[]) {}
}

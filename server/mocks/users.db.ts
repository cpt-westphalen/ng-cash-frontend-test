import { UserType } from "../models/User";

type dbTypes = {
	users: DbUserType[];
	accounts: AccountType[];
	transactions: DbTransferType[];
};

export interface DbUserType extends UserType {
	created_at: string;
	updated_at: string;
}

export type AccountType = {
	account_id: string;
	balance: number;
	transaction_ids: string[];
};

type DbTransferType = {
	uuid: string;
	from: string;
	to: string;
	amount: number;
	created_at: string;
	updated_at: string;
};

const db: dbTypes = {
	users: [],
	accounts: [],
	transactions: [],
};

export default db;

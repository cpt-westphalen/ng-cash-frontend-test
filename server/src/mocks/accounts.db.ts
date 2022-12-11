import { AccountType } from "../models/Account";

export interface DbAccountType extends AccountType {
	created_at: string;
	updated_at: string;
}

export const accounts_db: DbAccountType[] = [
	{
		account_id: "cb5f782b-3f9b-4891-af81-5ddf7cc3e76f",
		transaction_ids: [],
		balance: 10000,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
];

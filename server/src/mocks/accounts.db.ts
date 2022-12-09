import { AccountType } from "../models/Account";

export interface DbAccountType extends AccountType {
	created_at: string;
	updated_at: string;
}

export const accounts_db: DbAccountType[] = [];

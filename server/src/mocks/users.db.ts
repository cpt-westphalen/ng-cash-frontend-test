import { UserType } from "../models/User";

export interface DbUserType extends UserType {
	created_at: string;
	updated_at: string;
}

export const users_db: DbUserType[] = [];

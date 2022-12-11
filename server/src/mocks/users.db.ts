import { UserType } from "../models/User";

export interface DbUserType extends UserType {
	created_at: string;
	updated_at: string;
}

export const users_db: DbUserType[] = [
	{
		user_id: "08d13ecd-c881-4cab-a185-eae2ed404613",
		username: "admin",
		account_id: "cb5f782b-3f9b-4891-af81-5ddf7cc3e76f",
		password:
			"$2b$11$t86Rh6LcgIrEqen6lt4OKOwJLFY0KED8slFidEb2Cc9h/i.6Peq0G",
		created_at: "2022-12-11T02:05:21.279Z",
		updated_at: "2022-12-11T02:05:21.279Z",
	},
];

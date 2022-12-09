import db, { AccountType } from "../mocks/users.db";

export type CredentialsType = {
	username: string;
	password: string;
};

export interface SafeUserType {
	id: string;
	username: string;
	account: AccountType;
}

export interface UserType {
	id: string;
	username: string;
	password: string;
	account: AccountType;
}

export default class User {
	static async getAll() {
		return db.users;
	}

	static async findByUsername(username: string) {
		const user = db.users.find((user) => user.username === username);
		return user || null;
	}

	static async findById(id: string) {
		const user = db.users.find((user) => user.id === id);
		return user || null;
	}

	static async create(user: UserType) {
		const created_at = new Date().toISOString();
		const updated_at = new Date().toISOString();
		db.users.push({ ...user, created_at, updated_at });
		const createdUser = await this.findById(user.id);
		return createdUser;
	}
}

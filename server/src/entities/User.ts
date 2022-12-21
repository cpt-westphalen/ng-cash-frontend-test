import db from "../mocks/db";

export type CredentialsType = {
	username: string;
	password: string;
};

export interface UserType {
	user_id: string;
	username: string;
	password: string;
	account_id: string;
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
		const user = db.users.find((user) => user.user_id === id);
		return user || null;
	}

	static async findByAccountId(account_id: string) {
		const user = db.users.find((user) => user.account_id === account_id);
		return user || null;
	}

	static async create(user: UserType) {
		const created_at = new Date().toISOString();
		const updated_at = new Date().toISOString();
		db.users.push({ ...user, created_at, updated_at });
		const createdUser = await this.findById(user.user_id);
		return createdUser;
	}
}

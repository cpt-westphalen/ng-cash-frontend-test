import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

import User, { CredentialsType, UserType } from "../models/User";
import { AccountServicesI } from "./accountServices";
import { DbUserType } from "../mocks/users.db";

import { jwtSecret } from "../config/auth.config";

export interface SafeUserType {
	user_id: string;
	username: string;
	account_id: string;
}

export interface SafeUserWithTokenType extends SafeUserType {
	accessToken: string;
}

export interface UserServicesI {
	create: (credentials: CredentialsType) => Promise<UserType | null>;
	unsafeGetAll: () => Promise<DbUserType[] | null>;
	findByUsername: (username: string) => Promise<SafeUserType | null>;
	findByAccountId: (account_id: string) => Promise<SafeUserType | null>;
	login: (
		credentials: CredentialsType
	) => Promise<SafeUserWithTokenType | null>;
	parseUserFromTokenTHROWS: (token: string) => Promise<SafeUserType | null>;
}

export class UserServices implements UserServicesI {
	accountServices: AccountServicesI;

	constructor(accountServices: AccountServicesI) {
		this.accountServices = accountServices;
	}

	public async create({ username, password }: CredentialsType) {
		const user_id = uuidv4();
		username = username.trim();
		const account = await this.accountServices.create(user_id);
		if (!account) return null;
		const encryptedPwd = bcrypt.hashSync(password, 11);
		if (encryptedPwd) {
			const user: UserType = {
				user_id,
				username,
				account_id: account.account_id,
				password: encryptedPwd,
			};
			const createdUser = await User.create(user);
			if (createdUser) return createdUser;
		}
		return null;
	}

	public async unsafeGetAll() {
		return await User.getAll();
	}

	public async findByUsername(username: string) {
		const unsafeUser = await User.findByUsername(username);
		return unsafeUser ? this.removePrivateData(unsafeUser) : null;
	}

	public async unsafeFindByUsername(username: string) {
		const unsafeUser = await User.findByUsername(username);
		return unsafeUser || null;
	}

	public async findByAccountId(account_id: string) {
		const isValidUuid = uuidValidate(account_id);
		if (isValidUuid) {
			const unsafeUser = await User.findByAccountId(account_id);
			if (unsafeUser) return this.removePrivateData(unsafeUser);
		}
		return null;
	}

	public async login({ username, password }: CredentialsType) {
		const unsafeUser = await this.unsafeFindByUsername(username);
		if (unsafeUser) {
			const isCorrectPassword = this.verifyPassword({
				password,
				user: unsafeUser,
			});
			if (isCorrectPassword) {
				const safeUser = this.removePrivateData(unsafeUser);
				const token = this.generateJWT(safeUser);
				const safeUserWithToken: SafeUserWithTokenType = {
					...safeUser,
					accessToken: token,
				};
				return safeUserWithToken;
			}
		}
		return null;
	}

	private verifyPassword({
		password,
		user,
	}: {
		password: string;
		user: DbUserType;
	}) {
		if (user.password) {
			const isCorrectPassword = bcrypt.compareSync(
				password,
				user.password
			);
			if (isCorrectPassword) {
				return true;
			}
		}
		return false;
	}

	private generateJWT(safeUser: SafeUserType | UserType) {
		if ("password" in safeUser) {
			throw new Error("Unsafe user provided to JWT");
		}
		const token = jsonwebtoken.sign(safeUser, jwtSecret, {
			expiresIn: "1d",
		});
		return token;
	}

	public async parseUserFromTokenTHROWS(token: string) {
		const jwtPayload = jsonwebtoken.verify(token, jwtSecret);
		if (jwtPayload) {
			return jwtPayload as SafeUserType;
		}
		return null;
	}

	private removePrivateData(unsafeUser: DbUserType) {
		const safeUser: SafeUserType = {
			user_id: unsafeUser.user_id,
			username: unsafeUser.username,
			account_id: unsafeUser.account_id,
		};
		return safeUser;
	}
}

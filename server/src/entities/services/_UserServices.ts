import { _Account } from "../models/_Account";
import { _User } from "../models/_User";
import { UserRepository } from "../repositories/UserRepository";

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import { jwtSecret } from "../../config/auth.config";

interface SafeUser {
	id: string;
	username: string;
	account: _Account;
}

interface Token {
	accessToken: string;
}

type Credentials = {
	username: string;
	password: string;
};

export class UserServices {
	constructor(private userRepository: UserRepository) {}

	async findByUsername(username: string): Promise<SafeUser | null> {
		const unsafeUser = await this.userRepository.findByUsername(username);
		return unsafeUser ? this.turnSafe(unsafeUser) : null;
	}

	async unsafeFindByUsername(username: string): Promise<_User | null> {
		const unsafeUser = await this.userRepository.findByUsername(username);
		return unsafeUser;
	}

	async login({
		username,
		password,
	}: Credentials): Promise<(SafeUser & Token) | null> {
		const unsafeUser = await this.unsafeFindByUsername(username);
		if (!unsafeUser) {
			return null;
		}
		const pwdIsCorrect = this.verifyPassword(unsafeUser, password);
		if (!pwdIsCorrect) {
			return null;
		}
		const safeUser = this.turnSafe(unsafeUser);
		const { accessToken } = this.generateJWT(safeUser);
		const safeUserWithToken: SafeUser & Token = {
			...safeUser,
			accessToken,
		};
		return safeUserWithToken;
	}

	async create(
		{ username, password }: Credentials,
		account: _Account
	): Promise<_User> {
		const encryptedPwd = bcrypt.hashSync(password, 11);
		const user = new _User({
			username,
			password: encryptedPwd,
			account,
		});
		await this.userRepository.create(user);
		return user;
	}

	async parseUserFromTokenTHROWS({ accessToken }: Token): Promise<SafeUser> {
		const jwtPayload = jsonwebtoken.verify(accessToken, jwtSecret);
		if (!jwtPayload) {
			throw new Error("Invalid JWT");
		}
		return jwtPayload as SafeUser;
	}

	async unsafeGetAll() {
		return await this.userRepository.getAll();
	}

	private turnSafe(user: _User): SafeUser {
		return { id: user.id, username: user.username, account: user.account };
	}

	private generateJWT(safeUser: SafeUser): Token {
		if ("password" in safeUser) {
			throw new Error("Unsafe user provided to JWT");
		}
		const token = jsonwebtoken.sign(safeUser, jwtSecret, {
			expiresIn: "1d",
		});
		return { accessToken: token };
	}

	private verifyPassword(user: _User, password: string): boolean {
		if (!user.password) {
			return false;
		}
		const pwdIsCorrect: boolean = bcrypt.compareSync(
			password,
			user.password
		);
		return pwdIsCorrect;
	}
}

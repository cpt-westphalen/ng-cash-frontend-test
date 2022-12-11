import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

import User, { CredentialsType, UserType } from "../models/User";
import { DbUserType } from "../mocks/users.db";

import { jwtSecret } from "../config/auth.config";
import { accountServices } from "./accountServices";

export interface SafeUserType {
	user_id: string;
	username: string;
	account_id: string;
}

export interface SafeUserWithTokenType extends SafeUserType {
	accessToken: string;
}

const create = async ({ username, password }: CredentialsType) => {
	const user_id = uuidv4();
	username = username.trim();
	const account = await accountServices.create(user_id);
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
};

const unsafeGetAll = async () => {
	return await User.getAll();
};

const findByUsername = async (username: string) => {
	const unsafeUser = await User.findByUsername(username);
	return unsafeUser ? removePrivateData(unsafeUser) : null;
};

const unsafeFindByUsername = async (username: string) => {
	const unsafeUser = await User.findByUsername(username);
	return unsafeUser || null;
};

const findByAccountId = async (account_id: string) => {
	const isValidUuid = uuidValidate(account_id);
	if (isValidUuid) {
		const unsafeUser = await User.findByAccountId(account_id);
		if (unsafeUser) return removePrivateData(unsafeUser);
	}
	return null;
};

const login = async ({ username, password }: CredentialsType) => {
	const unsafeUser = await unsafeFindByUsername(username);
	if (unsafeUser) {
		const isCorrectPassword = verifyPassword({
			password,
			user: unsafeUser,
		});
		if (isCorrectPassword) {
			const safeUser = removePrivateData(unsafeUser);
			const token = generateJWT(safeUser);
			const safeUserWithToken: SafeUserWithTokenType = {
				...safeUser,
				accessToken: token,
			};
			return safeUserWithToken;
		}
	}
	return null;
};

const verifyPassword = ({
	password,
	user,
}: {
	password: string;
	user: DbUserType;
}) => {
	if (user.password) {
		const isCorrectPassword = bcrypt.compareSync(password, user.password);
		if (isCorrectPassword) {
			return true;
		}
	}
	return false;
};

const generateJWT = (safeUser: SafeUserType | UserType) => {
	if ("password" in safeUser) {
		throw new Error("Unsafe user provided to JWT");
	}
	const token = jsonwebtoken.sign(safeUser, jwtSecret, { expiresIn: "1d" });
	return token;
};

const parseUserFromTokenTHROWS = async (token: string) => {
	const jwtPayload = jsonwebtoken.verify(token, jwtSecret);
	if (jwtPayload) {
		console.log(jwtPayload);
		return jwtPayload as SafeUserType;
	}
	return null;
};

const removePrivateData = (unsafeUser: DbUserType) => {
	const safeUser: SafeUserType = {
		user_id: unsafeUser.user_id,
		username: unsafeUser.username,
		account_id: unsafeUser.account_id,
	};
	return safeUser;
};

export const userServices = {
	create,
	unsafeGetAll,
	findByUsername,
	findByAccountId,
	login,
	parseUserFromTokenTHROWS,
};

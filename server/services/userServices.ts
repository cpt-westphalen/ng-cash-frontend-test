import User, { CredentialsType, SafeUserType, UserType } from "../models/User";
import { v4 as uuidv4 } from "uuid";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtSecret } from "../config/auth.config";
import { DbUserType } from "../mocks/users.db";

const create = async ({ username, password }: CredentialsType) => {
	const id = uuidv4();
	username = username.trim();
	const account_id = uuidv4();
	const balance = 10000;
	const encryptedPwd = bcrypt.hashSync(password, 11);
	if (encryptedPwd) {
		const user: UserType = {
			id,
			username,
			account: {
				account_id,
				balance,
				transaction_ids: [],
			},
			password: encryptedPwd,
		};
		try {
			const createdUser = await User.create(user);
			if (createdUser) return removePrivateData(createdUser);
		} catch (error) {
			console.error(error);
			throw new Error("Something went wrong with the Database");
		}
	} else {
		throw new Error("Something went wrong");
	}
};

const getAll = async () => {
	return await User.getAll();
};

const findByUsername = async (username: string) => {
	return await User.findByUsername(username);
};

const login = async ({
	username,
	password,
}: {
	username: string;
	password: string;
}) => {
	const user = await findByUsername(username);
	if (user) {
		if (username == user.username) {
			const isCorrectPassword = verifyPassword({ password, user });
			if (isCorrectPassword) {
				const token = generateJWT(user);
				return {
					username: user.username,
					account: user.account,
					id: user.id,
					accessToken: token,
				};
			}
		} else {
			return null;
		}
	} else {
		return null;
	}
};

const verifyPassword = ({
	password,
	user,
}: {
	password: string;
	user: UserType;
}) => {
	if (user.password) {
		const isCorrectPassword = bcrypt.compareSync(password, user.password);
		if (isCorrectPassword) {
			return true;
		}
	}
	return false;
};

const generateJWT = (user: UserType) => {
	const token = jsonwebtoken.sign(
		{ username: user.username, account: user.account, id: user.id },
		jwtSecret,
		{ expiresIn: "1d" }
	);
	return token;
};

const removePrivateData = (unsafeUser: DbUserType) => {
	const safeUser: SafeUserType = {
		id: unsafeUser.id,
		username: unsafeUser.username,
		account: unsafeUser.account,
	};
	return safeUser;
};

const userServices = {
	create,
	getAll,
	findByUsername,
	login,
};

export default userServices;

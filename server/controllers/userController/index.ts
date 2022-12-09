import { Request, Response } from "express";
import { CredentialsType, UserType } from "../../models/User";
import userServices from "../../services/userServices";

// @desc Get all registered users from db
// @route GET /api/users
// @access Public (but should be private);
export const getUsers = async (req: Request, res: Response) => {
	const users: UserType[] = await userServices.getAll();
	return res.json(users);
};

// @desc Create new NG-CASH user and account
// @route POST /api/register
// @access Public
export const createUser = async (req: Request, res: Response) => {
	const { username, password } = req.body as CredentialsType;
	if (!username || !password) {
		return res.status(400);
	}
	if (username.length < 3 || password.length < 8) {
		return res
			.status(400)
			.json({ message: "Username or password length is too short." });
	}
	const user = await userServices.findByUsername(username.trim());
	if (user) {
		return res.status(409).json({ message: "User is taken" });
	}
	const passwordHasNumber = /\d+/.test(password);
	const passwordHasUppercase = /[A-Z]/.test(password);
	if (!passwordHasNumber || !passwordHasUppercase) {
		return res.status(400).json({
			message:
				"Password needs at least one number and one uppercase letter",
		});
	}
	try {
		const user = await userServices.create({ username, password });
		return res.status(200).json({ message: "account created!", ...user });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Something went wrong, account was not created.",
		});
	}
};

// @desc Login to NG-CASH Account and return token to Frontend
// @route POST /api/login
// @access Public
export const loginUser = async (req: Request, res: Response) => {
	const { username, password } = req.body as CredentialsType;
	if (username && password) {
		if (username.length < 3 || password.length < 8) {
			return res
				.status(400)
				.json({ message: "Username or password incorrect." });
		} else {
			const userWithToken = await userServices.login({
				username,
				password,
			});
			if (userWithToken) {
				return res.json(userWithToken);
			} else {
				return res
					.status(400)
					.json({ message: "Username or password incorrect." });
			}
		}
	}
};

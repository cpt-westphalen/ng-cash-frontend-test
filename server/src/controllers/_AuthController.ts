import { Request, Response } from "express";
import { AccountServices } from "../entities/services/_AccountServices";
import { Credentials, UserServices } from "../entities/services/_UserServices";

export class AuthController {
	constructor(
		private accountServices: AccountServices,
		private userServices: UserServices
	) {}

	// @desc Create new NG-CASH user and account
	// @route POST /api/register
	// @access Public
	async createUser(req: Request, res: Response) {
		const { username, password } = req.body;
		if (!username || !password) {
			return res.status(400).send();
		}
		if (username.length < 3 || password.length < 8) {
			return res
				.status(400)
				.json({ message: "Username or password length is too short." });
		}
		const user = await this.userServices.findByUsername(username.trim());
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

		const account = await this.accountServices.create();
		if (!account)
			return res
				.status(500)
				.json({
					message:
						"DB error: could not create account. Try again later.",
				});

		const unsafeUser = await this.userServices.create(
			{
				username,
				password,
			},
			account
		);

		if (unsafeUser) {
			const safeUserWithToken = await this.userServices.login({
				username,
				password,
			});
			if (safeUserWithToken) {
				return res.status(200).json({
					message: "account created!",
					user: safeUserWithToken,
				});
			}
		}
		return res.status(500).json({
			message: "Something went wrong, account was not created.",
		});
	}

	// @desc Login to NG-CASH Account and return token to Frontend
	// @route POST /api/login
	// @access Public
	async loginUser(req: Request, res: Response) {
		const { username, password } = req.body as Credentials;
		if (username && password) {
			if (username.length < 3 || password.length < 8) {
				return res
					.status(400)
					.json({ message: "Username or password incorrect." });
			} else {
				const userWithToken = await this.userServices.login({
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
		return res.status(400).send();
	}
}

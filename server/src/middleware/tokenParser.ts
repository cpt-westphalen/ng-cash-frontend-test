import { NextFunction, Request, Response } from "express";

import jsonwebtoken from "jsonwebtoken";

import { jwtSecret } from "../config/auth.config";
import { _Account } from "../application/models/_Account";

interface SafeUser {
	id: string;
	username: string;
	account: _Account;
}

interface Token {
	accessToken: string;
}

export const tokenParser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const parseUserFromTokenTHROWS = ({ accessToken }: Token): SafeUser => {
		const jwtPayload = jsonwebtoken.verify(accessToken, jwtSecret);
		if (!jwtPayload) {
			throw new Error("Invalid JWT");
		}
		return jwtPayload as SafeUser;
	};

	const bearerToken = req.headers.authorization;
	if (!bearerToken) {
		req.body.user = null;
		return next();
	}
	const accessToken = bearerToken.split(" ")[1];

	let user;
	try {
		user = parseUserFromTokenTHROWS({ accessToken });
	} catch (err: any) {
		console.error(err.message);
		res.status(403).json({ message: err.message });
	}

	if (!user) return res.status(403).send();

	req.body.user = user;
	return next();
};

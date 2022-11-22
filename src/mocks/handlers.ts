import { rest } from "msw";
import { addUser, findUserByUsername, findUserByAccount, login } from "./users";

export const handlers = [
	rest.post("/api/register", async (req, res, ctx) => {
		const data: { username: string; password: string } = await req.json();
		const isTaken = findUserByUsername(data.username);
		if (isTaken) {
			return res(
				ctx.status(409, "O nome de usuário já está registrado.")
			);
		}
		const { username, id, accessToken, account } = addUser({ ...data });
		return res(
			ctx.json({ username, id, accessToken, account: { id: account.id } })
		);
	}),
	rest.post("/api/auth", async (req, res, ctx) => {
		const credentials = await req.json();
		try {
			const payload = login(credentials);
			return res(ctx.json(payload));
		} catch (e) {
			console.error(e);
			return res(ctx.status(401));
		}
	}),
	rest.get("/api/:account/:data", async (req, res, ctx) => {
		const { account, data } = req.params;

		const target = findUserByAccount(account as string);

		if (!target) return res(ctx.status(404));

		if (target.accessToken === req.headers.get("authorization")) {
			switch (data) {
				case "cash":
					return res(ctx.json(target.account));
				default:
					return res(ctx.status(404));
			}
		} else {
			return res(ctx.status(403));
		}
	}),
];

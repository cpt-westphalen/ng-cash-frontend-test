import { User } from "@prisma/client";
import { MinimalSafeUser } from "../../models/_Transaction";
import { _User } from "../../models/_User";

export class UserMappers {
	static fromUserToMinimalSafeUser(user: _User): MinimalSafeUser {
		return {
			username: user.username,
			id: user.id,
			account: { id: user.account.id },
		} as MinimalSafeUser;
	}
	static fromPrismaToMinimalSafeUser(user: User): MinimalSafeUser {
		return {
			id: user.userId,
			username: user.username,
			account: { id: user.accountId },
		};
	}
}

import { Reducer } from "react";
import { localLogout } from "../services/auth";
import { AccountType, UserType } from "../mocks/userServices";

export type AuthAction = {
	type: string;
	payload: any;
};

export type AuthType = {
	user: UserType;
	account: AccountType;
};

export const initialAuth: AuthType = {
	user: {
		username: "",
		user_id: "",
		accessToken: "",
		account_id: "",
	},
	account: {
		account_id: "",
		balance: 0,
	},
};

export const authReducer: Reducer<AuthType, AuthAction> = (auth, action) => {
	switch (action.type) {
		case "login": {
			const user: UserType = action.payload;
			return { ...auth, user };
		}
		case "logout": {
			console.log("logout was called");
			localLogout();
			return initialAuth;
		}
		case "register": {
			const user: UserType = action.payload;
			return { ...auth, user };
		}
		case "update_balance": {
			const account: AccountType = action.payload;
			if (!account || account.account_id !== auth.user.account_id) {
				localLogout();
				return initialAuth;
			} else {
				return {
					...auth,
					account,
				};
			}
		}
		default: {
			console.log("authReducer went default!");
			throw new Error("action went default");
		}
	}
};

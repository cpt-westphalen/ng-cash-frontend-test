import { Reducer } from "react";
import { localLogout } from "../services/auth";
import { UserType } from "../mocks/userServices";

export type AuthAction = {
	type: string;
	payload: any;
};

export const initialAuth: UserType = {
	username: "",
	id: "",
	accessToken: "",
	account: {
		id: "",
		balance: 0,
	},
};

export const authReducer: Reducer<UserType, AuthAction> = (auth, action) => {
	switch (action.type) {
		case "login": {
			return { ...auth, ...action.payload };
		}
		case "logout": {
			console.log("logout was called");
			localLogout();
			return initialAuth;
		}
		case "register": {
			return action.payload.data;
		}
		case "update_balance": {
			const account = action.payload;
			if (!account || account.id !== auth.account.id) {
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

import { Reducer } from "react";
import { getAccount } from "../api/account";
import { localLogout } from "../api/auth";
import { UserType } from "./AuthContext";

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
			localLogout();
			if (action.payload) alert(action.payload.message);
			return initialAuth;
		}
		case "register": {
			if (action.payload.status == 200) {
				alert(
					action.payload.message || "Conta registrada com sucesso!"
				);
			}
			return action.payload.data;
		}
		case "update_balance": {
			const account = action.payload;
			if (!account || account.id !== auth.account.id) {
				localLogout();
				alert("Ocorreu um erro. Faça login novamente.");
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

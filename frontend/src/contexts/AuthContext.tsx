import { createContext, useReducer } from "react";
import { AuthAction, authReducer, AuthType, initialAuth } from "./authReducer";

export interface UserType {
	user_id: string;
	username: string;
	accessToken: string;
	account: AccountType;
}

export type AccountType = {
	id: string;
	balance: number;
};

type AuthContextType = {
	user: UserType;
	dispatch: (action: string, payload: any) => void;
};

export const AuthContext = createContext<AuthType | null>(null);
export const AuthDispatch = createContext<React.Dispatch<AuthAction> | null>(
	null
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [auth, dispatch] = useReducer(authReducer, initialAuth);

	return (
		<AuthDispatch.Provider value={dispatch}>
			<AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
		</AuthDispatch.Provider>
	);
};

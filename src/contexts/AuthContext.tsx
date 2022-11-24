import { createContext, useReducer } from "react";
import { UserType } from "../mocks/users";
import { AuthAction, authReducer, initialAuth } from "./authReducer";

type AuthContextType = {
	user: UserType;
	dispatch: (action: string, payload: any) => void;
};

export const AuthContext = createContext<UserType | null>(null);
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

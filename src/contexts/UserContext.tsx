import React, { createContext, useCallback, useEffect, useState } from "react";
import { localLogout } from "../services/auth";

export interface UserType {
	id: string;
	username: string;
	accessToken: string;
	account?: {
		id: string;
		balance: number;
	};
}

export interface UserCtxType extends UserType {
	logout: () => void;
}

export const UserContext = createContext<UserCtxType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserType | null>(null);

	const logout = useCallback(() => {
		localLogout();
		setUser(null);
	}, []);

	const checkLocalAuth = useCallback(() => {
		const localUserDataString = sessionStorage.getItem("user");
		if (localUserDataString) {
			const localUserData: UserType = JSON.parse(localUserDataString);
			if (user?.accessToken !== localUserData.accessToken) {
				setUser(localUserData);
			}
		}
	}, []);

	useEffect(() => {
		const interval = setInterval(checkLocalAuth, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<UserContext.Provider value={user ? { ...user, logout } : null}>
			{children}
		</UserContext.Provider>
	);
};

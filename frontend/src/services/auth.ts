import axios from "axios";

type UserCredentials = {
	username: string;
	password: string;
};

export const registerNewAccount = (credentials: UserCredentials) => {
	return axios.post("/api/register", credentials).then((res) => {
		localStorage.setItem("user", JSON.stringify(res.data));
		return res;
	});
};

export const loginToAccount = (credentials: UserCredentials) => {
	localStorage.removeItem("user");
	return axios.post("/api/login", credentials).then((res) => {
		localStorage.setItem("user", JSON.stringify(res.data));
		return res;
	});
};

export const localLogout = () => {
	localStorage.removeItem("user");
};

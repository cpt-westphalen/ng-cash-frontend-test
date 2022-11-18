import axios from "axios";

type UserCredentials = {
    username: string,
    password: string
}


export const registerNewAccount = (credentials : UserCredentials) => {
	return axios.post("/api/register", credentials)
	.then((res) => {
			sessionStorage.setItem(
				"user",
				JSON.stringify(res.data))})
}

export const loginToAccount = (credentials : UserCredentials) => {
	const controller = new AbortController();
    sessionStorage.removeItem("user");
    return axios.post("/api/auth", credentials).then((res) => {
			sessionStorage.setItem("user", JSON.stringify(res.data));
		});
}

export const localLogout = () => {
	sessionStorage.removeItem("user");
}

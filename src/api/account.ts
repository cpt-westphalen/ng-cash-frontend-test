import axios from "axios";

export const getAccount = (credentials: {
	accessToken: string;
	account: {
		id: string;
	};
}) => {
	return axios
		.get(`/api/${credentials.account.id}/cash`, {
			headers: { Authorization: credentials.accessToken },
		})
		.then((res) => res.data)
		.catch((err) => {
			throw new Error(
				err.status + ", não foi possível receber os dados."
			);
		});
};

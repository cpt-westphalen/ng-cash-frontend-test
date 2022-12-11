import axios from "axios";
import { AccountType, UserType } from "../mocks/userServices";

export const getAccount = (credentials: {
	accessToken: string;
	account_id: string;
}) => {
	return axios
		.get(`/api/${credentials.account_id}/cash`, {
			headers: { Authorization: "Bearer " + credentials.accessToken },
		})
		.then((res) => res.data)
		.catch((err) => {
			throw new Error(
				err.status + ", não foi possível receber os dados."
			);
		});
};

export const checkUserBalance = async (
	user: UserType,
	onSuccessCallback: (account: AccountType) => void,
	onErrorCallback: () => void
) => {
	if (!user || !user.accessToken) onErrorCallback();

	const { accessToken, account_id } = user;
	const targetCredentials = {
		accessToken,
		account_id,
	};

	try {
		const account = await getAccount(targetCredentials);
		onSuccessCallback(account);
	} catch (error) {
		onErrorCallback();
	}
};

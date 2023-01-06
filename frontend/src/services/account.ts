import axios from "axios";
import { AccountType, UserType } from "../mocks/userServices";

export const getAccount = (credentials: {
	accessToken: string;
	account: { id: string };
}) => {
	return axios
		.get(`/api/${credentials.account.id}/cash`, {
			headers: { Authorization: "Bearer " + credentials.accessToken },
		})
		.then((res) => res.data as { account: AccountType })
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
	if (!user || !user.accessToken) {
		onErrorCallback();
	}

	const { accessToken, account } = user;
	const targetCredentials = {
		accessToken,
		account,
	};

	try {
		const { account } = await getAccount(targetCredentials);
		onSuccessCallback(account);
	} catch (error) {
		onErrorCallback();
	}
};

import axios from "axios";
import { UserType } from "../mocks/userServices";

type TransferProps = {
	from: UserType;
	to: string;
	amount: number;
};

export const transfer = ({ from, to, amount }: TransferProps) => {
	if (to && amount > 0 && from.accessToken && from.username !== to) {
		const data = { from: from.account.id, to, amount };
		return axios.post(`/api/${from.account.id}/cashout`, data, {
			headers: { Authorization: from.accessToken },
		});
	} else {
		throw new Error("Dados inválidos para requisição.");
	}
};

export const getTransactionHistory = async (user: UserType) => {
	if (user && user.accessToken) {
		const historyResponse = await axios.get(
			"api/" + user.account.id + "/history",
			{
				headers: {
					authorization: user.accessToken,
				},
			}
		);
		return historyResponse.data;
	}
};
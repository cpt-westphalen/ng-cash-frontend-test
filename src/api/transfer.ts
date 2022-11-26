import axios from "axios";
import { APITransfer } from "../mocks/transfers";
import { UserType } from "../mocks/users";

type TransferProps = {
	from: UserType;
	to: string;
	amount: number;
};

export const transfer = ({ from, to, amount }: TransferProps) => {
	if (from.accessToken && to && amount > 0) {
		const data = { from: from.account.id, to, amount };
		return axios.post(`/api/${from.account.id}/cashout`, data, {
			headers: { Authorization: from.accessToken },
		});
	} else {
		throw new Error("Dados inválidos para requisição.");
	}
};

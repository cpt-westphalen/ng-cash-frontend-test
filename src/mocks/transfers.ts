import { APIUserData, generateToken } from "./users";

export interface APITransfer {
	uuid: string;
	from: string;
	to: string;
	amount: number;
	created_at?: string;
}

export const transfers: APITransfer[] = [
	{
		uuid: "sample-sample-sample-sample",
		from: "god",
		to: "admin",
		amount: 10000,
		created_at: new Date().toISOString(),
	},
];

export function createPayment(
	from: APIUserData,
	to: APIUserData,
	amount: number
) {
	const transfer: APITransfer = {
		uuid: generateToken(),
		from: from.account.id,
		to: to.account.id,
		amount,
		created_at: new Date().toISOString(),
	};
	from.transfers.push(transfer.uuid);
	to.transfers.push(transfer.uuid);
	transfers.push(transfer);
}

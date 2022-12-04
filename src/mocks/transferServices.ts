import { APIUserData, findUserByAccount, generateToken } from "./userServices";

export interface APITransfer {
	uuid: string;
	from: string;
	to: string;
	amount: number;
	created_at?: string;
}

export const transfersDB: APITransfer[] = [
	{
		uuid: "sample-sample-sample-sample",
		from: "user-uuid",
		to: "another-user-uuid",
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
	from.account.balance -= amount;
	to.account.balance += amount;
	from.transfers.push(transfer.uuid);
	to.transfers.push(transfer.uuid);
	transfersDB.push(transfer);
}

export async function getUserTransactionHistory(
	userTransactionsUuids: string[]
) {
	const transactionHistory = userTransactionsUuids
		.map((uuid) => {
			const transferObj = transfersDB.find(
				(transfer) => uuid === transfer.uuid
			);
			if (transferObj) {
				const from = findUserByAccount(transferObj.from)?.username;
				const to = findUserByAccount(transferObj.to)?.username;
				return { ...transferObj, to, from };
			} else {
				console.error(
					"Transaction UUID returned no Transaction Object"
				);
				return null;
			}
		})
		.filter((transaction) => transaction !== null);
	return transactionHistory;
}

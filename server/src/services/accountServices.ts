import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { NEW_USER_BALANCE } from "../config/newUserBalance.config";
import { Account, AccountType } from "../models/Account";

const create = async (user_id: string) => {
	if (uuidValidate(user_id)) {
		const account_id = uuidv4();
		const balance = NEW_USER_BALANCE;
		const transaction_ids: string[] = [];
		const account: AccountType = {
			user_id,
			account_id,
			balance,
			transaction_ids,
		};
		const safeNewAccount = await Account.create(account);
		if (safeNewAccount) return safeNewAccount;
	}
	return null;
};

const getBalanceByAccountId = async (account_id: string) => {
	if (uuidValidate(account_id)) {
		const balance = await Account.getBalance(account_id);
		return balance;
	}
	return null;
};

export const accountServices = {
	create,
	getBalanceByAccountId,
};

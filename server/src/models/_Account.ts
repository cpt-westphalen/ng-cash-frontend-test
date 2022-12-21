import { NEW_USER_BALANCE } from "../config/newUserBalance.config";

interface AccountType {
	account_id: string;
	balance: number;
	transaction_ids: string[];
}

type AccountProps = {
	balance: number;
	transaction_ids: string[];
};

export class _Account {
	private _id: string;
	private props: AccountProps;

	constructor(account_id: string, props?: AccountProps) {
		this._id = account_id;
		this.props = {
			balance: props?.balance || NEW_USER_BALANCE,
			transaction_ids: props?.transaction_ids || [],
		};
	}

	public get id(): string {
		return this._id;
	}
	public get balance(): number {
		return this.props.balance;
	}
	public get transaction_ids() {
		return this.props.transaction_ids;
	}
	public set transaction_ids(transactions: string[]) {
		this.props.transaction_ids = transactions;
	}
}

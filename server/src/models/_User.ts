import { randomUUID } from "crypto";
import { _Account } from "./_Account";
import { Account } from "./Account";

interface UserType {
	user_id: string;
	username: string;
	password: string;
	account_id: string;
}

type UserProps = {
	username: string;
	password: string;
	account: _Account;
};

export class _User {
	private _id: string;
	private props: UserProps;

	constructor(props: UserProps, id?: string) {
		this._id = id ?? randomUUID();
		if (props.account) {
			this.props = props;
		} else {
			const account = new _Account(randomUUID());
			this.props = {
				...props,
				account: account,
			};
		}
	}

	public get id(): string {
		return this._id;
	}

	public get username(): string {
		return this.props.username;
	}

	public get password(): string {
		return this.props.password;
	}

	public get account(): Account {
		return this.props.account;
	}
}

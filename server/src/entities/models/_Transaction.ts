import { randomUUID } from "crypto";
import { _User } from "./_User";

type TransactionProps = {
	from: _User;
	to: _User;
	amount: number;
	created_at: Date;
};

export class _Transaction {
	private _id: string;
	private props: TransactionProps;

	constructor(props: TransactionProps, id?: string) {
		this._id = id ?? randomUUID();
		this.props = props;
	}

	public get id(): string {
		return this._id;
	}

	public get to(): _User {
		return this.props.to;
	}

	public get from(): _User {
		return this.props.from;
	}

	public get amount(): number {
		return this.props.amount;
	}

	public get created_at(): Date {
		return this.props.created_at;
	}

	public get creditedAccountId(): string {
		return this.props.to.account.id;
	}

	public get debitedAccountId(): string {
		return this.props.from.account.id;
	}

	public get fromUsername(): string {
		return this.props.from.username;
	}
	public get toUsername(): string {
		return this.props.to.username;
	}
}

import { randomUUID } from "crypto";

type TransactionProps = {
	creditedAccountId: string;
	debitedAccountId: string;
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

	public get to(): string {
		return this.props.creditedAccountId;
	}

	public get from(): string {
		return this.props.debitedAccountId;
	}

	public get amount(): number {
		return this.props.amount;
	}

	public get created_at(): Date {
		return this.props.created_at;
	}
}

import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsBoxArrowInDownLeft } from "react-icons/bs";
import { cashToLocaleString } from "../../../utils/cashFormatter";

type TableRowProps = {
	transfer: [
		created_at: string,
		type: "in" | "out",
		username: string,
		amount: number
	];
};

const weekday = (day: number) =>
	["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."][day];

export const TableRow = ({ transfer }: TableRowProps) => {
	const [createdAt, type, username, amount] = transfer;
	const date = new Date(createdAt);
	const day = weekday(date.getDay());
	const dateDisplay = `${date.getDate()}, ${day}`;

	const amountDisplay =
		type == "in"
			? "+" + cashToLocaleString(amount)
			: "-" + cashToLocaleString(amount);

	return (
		<tr className='border-t border-b border-dashed border-zinc-300'>
			<td className='max-w-[10%]'>{dateDisplay}</td>
			<td>
				{type === "in" ? (
					<BsBoxArrowInDownLeft className='text-green-700' />
				) : (
					<BsBoxArrowUpRight className='text-red-800' />
				)}
			</td>
			<td
				className={`overflow-hidden text-ellipsis ${
					type == "out" ? " text-red-800" : ""
				}`}>
				{"@" + username}
			</td>
			<td className={`text-end ${type === "out" ? " text-red-800" : ""}`}>
				R$ <span className='font-semibold'>{amountDisplay}</span>
			</td>
		</tr>
	);
};

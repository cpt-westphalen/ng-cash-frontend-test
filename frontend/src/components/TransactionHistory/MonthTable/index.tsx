import { TableRow } from "../TableRow";

type TransferDisplayFormat = [
	created_at: string,
	type: "in" | "out",
	username: string,
	amount: number
];

type MonthTableProps = {
	data: TransferDisplayFormat[];
};

const monthDisplayTitle = (month: number) =>
	[
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	][month];

export const MonthTable = ({ data }: MonthTableProps) => {
	const month = parseInt(data[0][0].split("-")[1]) - 1;
	const monthTitle = monthDisplayTitle(month);

	return (
		<table className='text-sm leading-6 table-fixed w-full max-w-full'>
			<colgroup>
				<col
					span={1}
					className='w-[20%]'
				/>
				<col
					span={1}
					className='w-[8%]'
				/>
				<col span={1} />
				<col
					span={1}
					className='w-[28%]'
				/>
			</colgroup>
			<thead>
				<tr>
					<th
						colSpan={4}
						className='text-start text-2xl font-bold'>
						{monthTitle}
					</th>
				</tr>
			</thead>
			<tbody>
				{data.map((transfer) => (
					<TableRow
						transfer={transfer}
						key={transfer[0] + transfer[2] + transfer[3]}
					/>
				))}
			</tbody>
		</table>
	);
};

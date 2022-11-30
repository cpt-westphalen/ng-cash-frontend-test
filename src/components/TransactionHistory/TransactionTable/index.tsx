import { useMemo } from "react";
import { MonthTable } from "../MonthTable";

type TransferDisplayFormat = [
	created_at: string,
	type: "in" | "out",
	username: string,
	amount: number
];

type TransactionTableProps = {
	filteredTransactions: TransferDisplayFormat[];
};

export const TransactionTable = ({
	filteredTransactions,
}: TransactionTableProps) => {
	const transactionsByMonth = useMemo(() => {
		const months: string[] = [];
		filteredTransactions.forEach((transaction) => {
			const month = transaction[0].split("-")[1];
			if (!months.includes(month)) months.push(month);
		});
		const transactionsByMonthArray = months.map((month) => {
			return filteredTransactions.filter((transaction) => {
				return month == transaction[0].split("-")[1];
			});
		});
		return transactionsByMonthArray;
	}, [filteredTransactions]);

	return (
		<div
			id='area de tabelas'
			className='flex flex-col gap-6 border-t border-b border-black px-2 py-4 overflow-y-auto max-h-full'>
			<div
				id='mes'
				className='flex flex-col gap-2'>
				{transactionsByMonth.map((monthTransactions) => (
					<MonthTable
						data={monthTransactions}
						key={
							monthTransactions[0][0] +
							monthTransactions[monthTransactions.length - 1][2]
						}
					/>
				))}
			</div>

			<p className='self-center text-zinc-300'>Sem mais registros...</p>
		</div>
	);
};

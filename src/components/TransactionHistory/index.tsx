import { MonthTable } from "./MonthTable";
import { TransactionTable } from "./TransactionTable";

const todayString = new Date()
	.toLocaleDateString("pt-br")
	.split("/")
	.reverse()
	.join("-");

type TransferDisplayFormat = [
	created_at: string,
	type: "in" | "out",
	username: string,
	amount: number
];

const mockTransfers: TransferDisplayFormat[] = [
	["2022-11-14 15:30:00", "in", "outro_user_21", 10000],
	["2022-11-13 15:30:00", "out", "username25", 2000],
	["2022-11-05 15:30:00", "out", "outro_user_maior_ainda", 1723],
	["2022-11-01 16:35:34", "out", "outro_user_menor", 1723],
	["2022-11-01 10:11:55", "in", "brotherzito99", 1239],
	["2022-11-01 09:42:15", "out", "Padaria Marconi", 10000],
	["2022-10-14 15:30:00", "in", "outro_user_21", 10000],
	["2022-10-13 15:30:00", "out", "username25", 2000],
	["2022-10-05 15:30:00", "out", "outro_user_maior_ainda", 1723],
	["2022-09-01 16:35:34", "out", "outro_user_menor", 1723],
	["2022-08-01 10:11:55", "in", "brotherzito99", 1239],
	["2022-08-01 09:42:15", "out", "Padaria Marconi", 10000],
	["2022-07-14 15:30:00", "in", "outro_user_21", 10000],
	["2022-07-13 15:30:00", "out", "username25", 2000],
	["2022-07-05 15:30:00", "out", "outro_user_maior_ainda", 1723],
	["2022-07-01 16:35:34", "out", "outro_user_menor", 1723],
	["2022-07-01 10:07:55", "in", "brotherzito99", 1239],
	["2022-07-01 09:42:15", "out", "Padaria Marconi", 10000],
	["2022-06-14 15:30:00", "in", "outro_user_21", 10000],
	["2022-06-13 15:30:00", "out", "username25", 2000],
	["2022-06-05 15:30:00", "out", "outro_user_maior_ainda", 1723],
	["2022-06-01 16:35:34", "out", "outro_user_menor", 1723],
	["2022-06-01 10:06:55", "in", "brotherzito99", 1239],
	["2022-06-01 09:42:15", "out", "Padaria Marconi", 10000],
];

export const TransactionHistory = () => {
	return (
		<div className='flex flex-col gap-4 px-6 py-10 bg-primary text-secondary rounded-t max-h-screen'>
			<div
				id='filtros'
				className='flex flex-col gap-4'>
				<div className='flex items-end'>
					<h1 className='text-4xl font-bold flex-1'>Transações</h1>
					<button className='w-24 h-10 font-bold rounded bg-secondary text-primary'>
						Filtros
					</button>
				</div>
				<div className='flex flex-row flex-wrap justify-center sm:justify-end items-end gap-4'>
					<div className='flex gap-2'>
						<label className='relative'>
							<span className='absolute text-[12px] -top-2 left-2 bg-primary leading-none px-1'>
								De:
							</span>
							<input
								type='date'
								min={"2022-01-01"}
								max={todayString}
								placeholder='Data inicial'
								className='p-1 h-8 border border-secondary bg-primary rounded'
							/>
						</label>
						<label className='relative'>
							<span className='absolute text-[12px] -top-2 left-2 bg-primary leading-none px-1'>
								Até:
							</span>
							<input
								type='date'
								min={"2022-01-01"}
								max={todayString}
								placeholder='Data final'
								className='p-1 h-8 border border-secondary bg-primary rounded'
							/>
						</label>
					</div>
					<div className='flex gap-2'>
						<button className='w-16 sm:w-11 h-8 font-bold rounded bg-secondary text-primary'>
							in
						</button>

						<button className='w-16 sm:w-11 h-8 font-bold rounded bg-secondary text-primary'>
							out
						</button>
					</div>
				</div>
			</div>
			<TransactionTable filteredTransactions={mockTransfers} />
		</div>
	);
};

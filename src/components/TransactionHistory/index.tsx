import React, { useState } from "react";
import { TransactionTable } from "./TransactionTable";

const DAY_IN_MS = 1000 * 60 * 60 * 24;
const today = new Date();

const todayString = today
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

const initialFilters = {
	show: false,
	cash: {
		in: true,
		out: true,
	},
	date: {
		start: new Date(today.getTime() - DAY_IN_MS * 30),
		end: today,
	},
};

//responsible for fetching transaction data and applying filters to it
export const TransactionHistory = () => {
	const [filters, setFilters] = useState(initialFilters);

	const toggleCashFilter = (type: "in" | "out") => {
		if (type == "in") {
			setFilters((prev) => ({
				...prev,
				cash: { in: !prev.cash.in, out: prev.cash.out },
			}));
		}
		if (type == "out") {
			setFilters((prev) => ({
				...prev,
				cash: { in: prev.cash.in, out: !prev.cash.out },
			}));
		}
	};

	const toggleShowFilters = () => {
		setFilters((prev) => ({ ...prev, show: !prev.show }));
	};

	const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.valueAsDate;
		const type = event.target.name as "start" | "end";
		if (value !== null) setNewDate({ type, value });
	};

	const setNewDate = ({
		type,
		value,
	}: {
		type: "start" | "end";
		value: Date;
	}) => {
		if (type == "start") {
			setFilters((prev) => ({
				...prev,
				date: { start: value, end: prev.date.end },
			}));
		}
		if (type == "end") {
			setFilters((prev) => ({
				...prev,
				date: { start: prev.date.start, end: value },
			}));
		}
	};

	return (
		<div className='flex flex-col gap-4 px-6 py-10 bg-primary text-secondary rounded-t max-h-screen'>
			<div
				id='filtros'
				className='flex flex-col gap-4'>
				<div className='flex items-end'>
					<h1 className='text-4xl font-bold flex-1'>Transações</h1>
					<button
						className={`w-24 h-10 font-bold rounded ${
							filters.show
								? "bg-secondary text-primary"
								: "bg-primary text-secondary"
						}`}
						onClick={toggleShowFilters}>
						Filtros
					</button>
				</div>
				{filters.show && (
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
									name='start'
									onChange={handleChangeDate}
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
									name='end'
									onChange={handleChangeDate}
									min={"2022-01-01"}
									max={todayString}
									placeholder='Data final'
									className='p-1 h-8 border border-secondary bg-primary rounded'
								/>
							</label>
						</div>
						<div className='flex gap-2'>
							<button
								onClick={() => toggleCashFilter("in")}
								className={`w-16 sm:w-11 h-8 font-bold rounded ${
									filters.cash.in
										? "bg-secondary text-primary"
										: "bg-primary text-secondary"
								}`}>
								in
							</button>

							<button
								onClick={() => toggleCashFilter("out")}
								className={`w-16 sm:w-11 h-8 font-bold rounded ${
									filters.cash.out
										? "bg-secondary text-primary"
										: "bg-primary text-secondary"
								}`}>
								out
							</button>
						</div>
					</div>
				)}
			</div>
			<TransactionTable filteredTransactions={mockTransfers} />
		</div>
	);
};

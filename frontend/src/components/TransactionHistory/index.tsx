import { useEffect, useMemo, useState } from "react";
import { AuthType } from "../../contexts/authReducer";
import { getTransactionHistory } from "../../services/transfer";
import { TransactionTable } from "./TransactionTable";

const DAY_IN_MS = 1000 * 60 * 60 * 24;
const today = () => new Date();

const todayString = today()
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

interface APITransfer {
	transaction_id: string;
	from: string;
	to: string;
	amount: number;
	created_at: string;
}

export const TransactionHistory = ({ auth }: { auth: AuthType }) => {
	const initialFilters = {
		show: false,
		cash: {
			in: true,
			out: true,
		},
		date: {
			start: new Date(today().getTime() - DAY_IN_MS * 30),
			end: today(),
		},
	};

	const [transactions, setTransactions] = useState<APITransfer[]>([]);
	const [filters, setFilters] = useState(initialFilters);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;
		getTransactionHistory(auth.user)
			.then((data) => {
				if (isMounted && (data as APITransfer[])) {
					setTransactions((prev) => {
						setIsLoading(false);
						return data;
					});
				}
			})
			.catch((error) => {
				console.log("error with request for user history");
				console.warn(error);
			});
		return () => {
			isMounted = false;
		};
	}, []);

	const filteredTransactions = useMemo(() => {
		if (transactions) {
			let filteredTransactions: APITransfer[] = [...transactions];
			if (filters.cash.in == false)
				filteredTransactions = filteredTransactions.filter(
					(transaction) => transaction.to !== auth.user.username
				);

			if (filters.cash.out == false)
				filteredTransactions = filteredTransactions.filter(
					(transactions) => transactions.from !== auth.user.username
				);

			if (filters.date.start)
				filteredTransactions = filteredTransactions.filter(
					(transactions) =>
						new Date(transactions["created_at"]).getTime() >
						new Date(filters.date.start).getTime()
				);

			if (filters.date.end)
				filteredTransactions = filteredTransactions.filter(
					(transactions) =>
						new Date(transactions["created_at"]).getTime() <
						new Date(filters.date.end).getTime()
				);

			return filteredTransactions;
		} else {
			return [];
		}
	}, [transactions, filters, auth.user.user_id]);

	const transactionFormatter = (filteredTransactions: APITransfer[]) => {
		const formattedTransactions = filteredTransactions.map(
			({ amount, from, to, created_at }) => {
				const date = created_at;
				const type = from === auth.user.username ? "out" : "in";
				const username = from === auth.user.username ? to : from;
				const formattedTransaction: TransferDisplayFormat = [
					date,
					type,
					username,
					amount,
				];
				return formattedTransaction;
			}
		);
		return formattedTransactions;
	};

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
		else setNewDate({ type, value: new Date() });
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
		<div className='flex flex-col gap-4 px-6 py-10 bg-primary text-secondary rounded-t min-h-full max-h-screen'>
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
			{isLoading ? (
				"loading..."
			) : (
				<TransactionTable
					filteredTransactions={transactionFormatter(
						filteredTransactions
					)}
				/>
			)}
		</div>
	);
};

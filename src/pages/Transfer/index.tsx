import { Link, useNavigate } from "react-router-dom";
import {
	ChangeEvent,
	FormEvent,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { AuthContext, AuthDispatch } from "../../contexts/AuthContext";
import { GoChevronLeft } from "react-icons/go";
import { CashDisplay } from "../../components/CashDisplay";
import { UserType } from "../../mocks/users";
import { AuthAction } from "../../contexts/authReducer";
import { cashToLocaleString } from "../../utils/cashFormatter";
import { Button } from "../../components/Button";

type TransferFromTypes = {
	to: string;
	amount: number;
};

export const Transfer = () => {
	const navigate = useNavigate();

	const user = useContext(AuthContext) as UserType;
	const authDispatch = useContext(AuthDispatch) as React.Dispatch<AuthAction>;

	const [showCash, setShowCash] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [whoToTransfer, setWhoToTransfer] = useState("");
	const [amountToTransfer, setAmountToTransfer] = useState(0);
	const amountRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);

	const body = document.querySelector("#root");

	useEffect(() => {
		if (!user.accessToken) navigate("/");
	}, []);

	const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value.replace(/\D/gi, "");
		if (Number.isNaN(Number(value))) value = "0";
		const cash = parseInt(value);
		setAmountToTransfer((prev) => {
			if (amountRef.current) {
				if (cash > user.account.balance) {
					const cashFormattedValue = cashToLocaleString(prev);
					amountRef.current.value = "R$ " + cashFormattedValue;
					return prev;
				}
				const cashFormattedValue = cashToLocaleString(cash);
				amountRef.current.value = "R$ " + cashFormattedValue;
			}
			return cash;
		});
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		console.log(amountToTransfer);
	};

	const handleChangeTo = (event: ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value.replace(/^[^a-zA-Z0-9_]+$/gi, ""); // fix this!!
		setWhoToTransfer((prev) => {
			if (usernameRef.current) usernameRef.current.value = value;
			return value;
		});
	};

	return (
		<div className='min-h-screen flex flex-col justify-center items-center'>
			<Link
				to='/'
				className='fixed top-6 left-2 rounded hover:scale-105 hover:-translate-x-1 transition '>
				<GoChevronLeft size={32} />
			</Link>
			<div className='px-8 min-h-screen w-full max-w-5xl flex flex-col justify-evenly lg:justify-center items-stretch'>
				<h2 className='mt-24 mb-4 flex-grow text-3xl font-semibold whitespace-pre-wrap'>
					Bora transferir:
				</h2>
				<div className='flex-1 flex flex-col pb-8'>
					<CashDisplay
						title='Saldo restante'
						cash={user.account.balance - amountToTransfer}
						display={{ hide: !showCash, toggle: setShowCash }}
					/>
				</div>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-4 justify-center items-center mb-12 lg:mb-32'>
					<div className='flex flex-col gap-2'>
						<label
							className='text-2xl font-semibold'
							htmlFor='username'>
							Para quem?
						</label>
						<div className='relative'>
							<input
								ref={usernameRef}
								id='username'
								name='username'
								type='text'
								onChange={handleChangeTo}
								className='h-11 w-72 pl-12 pr-2 text-2xl placeholder:text-gray rounded-lg border-2 border-dashed border-primary bg-secondary'
							/>
							<span className='absolute left-4 text-2xl font-bold top-1'>
								@
							</span>
						</div>
					</div>
					<div className='flex flex-col gap-2 mb-2'>
						<label
							className='text-2xl font-semibold'
							htmlFor='amount'>
							Quanto?
						</label>
						<div>
							<input
								id='amount'
								onChange={handleChangeAmount}
								name='amount'
								ref={amountRef}
								type='text'
								placeholder='R$ 100,00'
								className='h-11 w-72 text-center text-2xl font-semibold placeholder:text-gray placeholder:font-normal rounded-lg border-2 border-dashed border-primary bg-secondary'
							/>
						</div>
					</div>
					<Button type='fancy'>Enviar!</Button>
				</form>
			</div>
		</div>
	);
};
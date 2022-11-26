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
import { transfer } from "../../api/transfer";

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
	const [errors, setErrors] = useState({
		hasAny: false,
		active: {
			target: "",
			message: "",
		},
	});

	const body = document.querySelector("#root"); //for modal

	useEffect(() => {
		if (!user.accessToken) navigate("/");
	}, []);

	const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value.replace(/\D/gi, "");
		if (Number.isNaN(parseInt(value))) value = "0";
		const cash = parseInt(value);
		setAmountToTransfer((prev) => {
			if (amountRef.current) {
				if (cash > user.account.balance) {
					const cashFormattedValue = cashToLocaleString(prev);
					amountRef.current.value = "R$ " + cashFormattedValue;
					setErrors({
						hasAny: true,
						active: {
							target: "amount",
							message: "Não há saldo suficiente",
						},
					});
					setTimeout(() => {
						setErrors({ ...errors, hasAny: false });
					}, 1000);

					return prev;
				} else if (!cash) {
					const cashFormattedValue = cashToLocaleString(0);
					amountRef.current.value = "R$ " + cashFormattedValue;
					return 0;
				} else {
					const cashFormattedValue = cashToLocaleString(cash);
					amountRef.current.value = "R$ " + cashFormattedValue;
				}
			}
			return cash;
		});
	};

	const handleChangeTo = (event: ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value.trim().replace(/[^a-zA-Z0-9_]+/gi, "");
		setWhoToTransfer((prev) => {
			if (usernameRef.current) usernameRef.current.value = value;
			return value;
		});
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (amountToTransfer > 0 && whoToTransfer) {
			transfer({
				from: user,
				to: whoToTransfer,
				amount: amountToTransfer,
			})
				.then((res) => {
					console.log(res.data);
				})
				.catch((e) => {
					console.warn(e);
				});
		}
	};

	return (
		<div className='min-h-screen flex flex-col justify-center items-center'>
			<Link
				to='/'
				className='fixed top-6 left-2 rounded hover:scale-105 hover:-translate-x-1 transition '>
				<GoChevronLeft size={32} />
			</Link>
			<div className='pt-[30%] h-screen w-full flex flex-row flex-wrap justify-center md:justify-between items-stretch md:items-center'>
				<div className='flex justify-center w-full'>
					<h2 className='w-[70%] text-3xl font-semibold'>
						Bora transferir: {/* fix layout */}
					</h2>
				</div>
				<div className='flex flex-1 flex-col gap-4 justify-start items-stretch mb-[30%] md:mb-0 md:w-[50%]'>
					<div className='flex flex-col pb-8 w-80 md:w-full self-center'>
						<CashDisplay
							title='Saldo restante'
							cash={user.account.balance - amountToTransfer}
							display={{ hide: !showCash, toggle: setShowCash }}
						/>
					</div>
					<form
						onSubmit={handleSubmit}
						className={"flex flex-col justify-center items-center"}>
						<div className='flex flex-row flex-wrap gap-4 justify-center items-center mb-12'>
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
							<div className='flex flex-col gap-2'>
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
										className={`h-11 w-72 text-center text-2xl font-semibold placeholder:text-gray placeholder:font-normal rounded-lg border-2 border-dashed ${
											errors.hasAny &&
											errors.active.target === "amount"
												? "border-red"
												: "border-primary"
										} bg-secondary`}
									/>
								</div>
							</div>
						</div>
						<div className='fixed bottom-[10%]'>
							<Button type='fancy'>{"Enviar!"}</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

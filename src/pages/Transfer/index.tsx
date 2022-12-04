import { Link, useNavigate } from "react-router-dom";
import {
	ChangeEvent,
	FormEvent,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { AuthContext, AuthDispatch } from "../../contexts/AuthContext";
import { GoChevronLeft } from "react-icons/go";
import { CashDisplay } from "../../components/CashDisplay";
import { AccountType, UserType } from "../../mocks/userServices";
import { AuthAction } from "../../contexts/authReducer";
import { cashToLocaleString } from "../../utils/cashFormatter";
import { Button } from "../../components/Button";
import { transfer } from "../../services/transfer";
import { AxiosError } from "axios";
import { Modal } from "../../components/Modal";
import { checkUserBalance } from "../../services/account";

const emptyError = {
	hasAny: false,
	active: {
		target: "",
		message: "",
	},
};

export const Transfer = () => {
	const navigate = useNavigate();

	const user = useContext(AuthContext) as UserType;
	const authDispatch = useContext(AuthDispatch) as React.Dispatch<AuthAction>;

	const [showCash, setShowCash] = useState(false);
	const [modal, setModal] = useState({
		open: false,
		message: {
			title: "Ops, ocorreu um erro",
			desc: "Tente novamente mais tarde.",
			button: "Ok!",
		},
	});

	const [whoToTransfer, setWhoToTransfer] = useState("");
	const [amountToTransfer, setAmountToTransfer] = useState(0);
	const [formStatus, setFormStatus] = useState("waiting");

	const amountRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);

	const [errors, setErrors] = useState(emptyError);

	const body = document.querySelector("#root"); //for modal

	const handleRefresh = () => {
		const updateUserBalanceCallback = (account: AccountType) => {
			if (account.balance == 0) {
				setAmountToTransfer(0);
				if (amountRef.current) amountRef.current.value = "0";
			}
			authDispatch({
				type: "update_balance",
				payload: account,
			});
		};

		const redirectToLogin = () => {
			authDispatch({
				type: "logout",
				payload: {
					message: "Ops, ocorreu um problema. Por favor, faça login.",
				},
			});
			setTimeout(() => navigate("/login"), 1000);
		};

		checkUserBalance(user, updateUserBalanceCallback, redirectToLogin);
	};

	useEffect(() => {
		if (!user.accessToken) navigate("/");

		const intervalHandle = setInterval(handleRefresh, 10000);

		return () => {
			clearInterval(intervalHandle);
		};
	}, []);

	useEffect(() => {
		if (formStatus == "sent") {
			setWhoToTransfer("");
			setAmountToTransfer(0);
			if (amountRef.current && usernameRef.current) {
				amountRef.current.value = "";
				usernameRef.current.value = "";
			}
			handleRefresh();
		}
	}, [formStatus]);

	const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
		if (formStatus == "isSure?" || formStatus == "sent")
			setFormStatus("waiting");
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
		if (formStatus == "isSure?" || formStatus == "sent")
			setFormStatus("waiting");
		let value = event.target.value.trim().replace(/[^a-zA-Z0-9_]+/gi, "");
		setWhoToTransfer((prev) => {
			if (usernameRef.current) usernameRef.current.value = value;
			return value;
		});
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (
			formStatus !== "isSure?" &&
			amountToTransfer > 0 &&
			user.account.balance > 0
		) {
			if (whoToTransfer == user.username) {
				setErrors(() => {
					setTimeout(() => setErrors(emptyError), 1000);
					return {
						hasAny: true,
						active: {
							target: "username",
							message: "Não é possível transferir para si mesmo.",
						},
					};
				});
				return;
			}
			setFormStatus("isSure?");
			return;
		} else if (formStatus == "isSure?") {
			if (amountToTransfer > 0 && whoToTransfer) {
				transfer({
					from: user,
					to: whoToTransfer,
					amount: amountToTransfer,
				})
					.then(() => {
						setFormStatus("sent");
						setModal({
							open: true,
							message: {
								title: "Sucesso!",
								desc: `O dinheiro foi enviado para ${whoToTransfer}`,
								button: "Ok!",
							},
						});
					})
					.catch((e: AxiosError) => {
						if (e.response) {
							if (
								e.response.status == 409 ||
								e.response.status == 403
							) {
								authDispatch({
									type: "logout",
									payload: "Unauthorized token for transfer",
								});
							} else if (e.response.status == 404) {
								setErrors(() => {
									setTimeout(
										() => setErrors(emptyError),
										1000
									);
									return {
										hasAny: true,
										active: {
											target: "username",
											message: "Usuário não encontrado.",
										},
									};
								});
							}
						}
					});
			}
		}
	};

	const handleModalClose = () => {
		if (modal.open) setModal((prev) => ({ ...prev, open: false }));
	};

	return (
		<div className='w-full min-h-screen relative md:bg-ng md:bg-cover'>
			<Link
				to='/'
				className='fixed top-6 left-2 rounded hover:scale-105 hover:-translate-x-1 transition '>
				<GoChevronLeft size={32} />
			</Link>
			<div className='flex flex-row flex-wrap p-12 md:justify-center md:items-center md:min-h-screen max-w-[1440px]'>
				<div className='flex flex-col flex-grow gap-4 sm:min-w-[24rem] md:p-12 mt-[12vh] mb-[10vh] md:mt-0 md:mb-0'>
					<h2 className='text-3xl md:text-5xl font-bold'>
						Bora transferir:
					</h2>
					<div>
						<CashDisplay
							className='w-full'
							title='Saldo restante'
							cash={user.account.balance - amountToTransfer}
							display={{ hide: !showCash, toggle: setShowCash }}
						/>
					</div>
				</div>

				<form
					onSubmit={handleSubmit}
					className={
						"flex flex-col flex-grow md:max-w-md justify-center items-center gap-4 mb-[15%] md:mb-0 py-6 md:p-8 md:mx-12 md:bg-black md:border md:border-primary md:rounded-md"
					}>
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
								className={`h-11 w-72 pl-12 pr-2 text-2xl placeholder:text-gray rounded-md border-2 border-dashed bg-secondary ${
									errors.hasAny &&
									errors.active.target == "username"
										? "border-red text-red"
										: "border-primary"
								}`}
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
								className={`h-11 w-72 text-center text-2xl font-semibold placeholder:text-gray placeholder:font-normal rounded-md border-2 border-dashed ${
									errors.hasAny &&
									errors.active.target === "amount"
										? "border-red"
										: "border-primary"
								} bg-secondary`}
							/>
						</div>
					</div>

					<div className='absolute left-0 bottom-[10%] right-0 flex justify-center md:relative md:bottom-0 md:mt-3'>
						<Button type='fancy'>
							{errors.hasAny && errors.active.target == "username"
								? "Ops!"
								: formStatus == "isSure?"
								? "Certeza?"
								: formStatus == "sent"
								? "Enviado!"
								: "Enviar!"}
						</Button>
					</div>
				</form>
			</div>
			<Modal
				type='message'
				message={modal.message}
				props={{
					isOpen: modal.open,
					preventScroll: true,
					onRequestClose: handleModalClose,
					appElement: body,
				}}
			/>
		</div>
	);
};

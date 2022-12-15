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
import { AuthAction, AuthType } from "../../contexts/authReducer";
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

	const auth = useContext(AuthContext) as AuthType;
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
		checkUserBalance(auth.user, updateUserBalanceCallback, redirectToLogin);
	};

	useEffect(() => {
		if (!auth.user.accessToken) navigate("/");

		const intervalHandle = setInterval(handleRefresh, 10000);

		return () => {
			clearInterval(intervalHandle);
		};
	}, []);

	useEffect(() => {
		if (!auth.user.accessToken) navigate("/");
	}, [auth]);

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
				if (cash > auth.account.balance) {
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

		if (!whoToTransfer) {
			setFormStatus("waiting");
			setErrors(() => {
				setTimeout(() => setErrors(emptyError), 2000);
				return {
					hasAny: true,
					active: {
						target: "username",
						message: "Insira o usuário da pessoa.",
					},
				};
			});
			return;
		}
		if (
			formStatus !== "isSure?" &&
			amountToTransfer > 0 &&
			auth.account.balance > 0
		) {
			if (whoToTransfer == auth.user.username) {
				setErrors(() => {
					setTimeout(() => setErrors(emptyError), 2000);
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
					from: auth.user,
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
								e.response.status >= 400 &&
								e.response.status !== 404 &&
								e.response.status < 500
							) {
								authDispatch({
									type: "logout",
									payload: "Unauthorized token for transfer",
								});
							} else if (e.response.status == 404) {
								setErrors(() => {
									setTimeout(
										() => setErrors(emptyError),
										2000
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
			<div className='flex flex-col lg:flex-row lg:flex-wrap py-10 px-12 md:p-12 justify-around items-center min-h-screen'>
				<div className='flex flex-col max-w-lg flex-grow gap-4 self-auto pt-10 md:p-12 mt-0 mb-0'>
					<h2 className='text-4xl md:text-5xl font-bold'>
						Bora transferir:
					</h2>
					<div className='w-full'>
						<CashDisplay
							className='w-full md:w-full'
							title='Saldo restante'
							cash={auth.account.balance - amountToTransfer}
							display={{ hide: !showCash, toggle: setShowCash }}
						/>
					</div>
				</div>

				<form
					onSubmit={handleSubmit}
					className={
						"flex flex-col flex-grow md:max-w-md justify-center items-center gap-4 mb-0 p-8 mx-12 md:bg-black md:border md:border-primary md:rounded-md"
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

					<div className='flex justify-center mt-3'>
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
			<div className='absolute bottom-5 left-0 right-0 flex justify-center items-center'>
				<div
					className={`transition-transform rounded p-6 bg-primary text-secondary ${
						errors.hasAny ? " scale-100" : " scale-0"
					} `}>
					{errors.hasAny && <p>⚠️ {errors.active.message}</p>}
				</div>
			</div>
		</div>
	);
};

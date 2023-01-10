import logotype from "../../assets/logo-ngcash-branco-simples.88c5860.svg";
import { GoChevronLeft } from "react-icons/go";

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

import { registerNewAccount } from "../../services/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthDispatch } from "../../contexts/AuthContext";
import { AuthAction } from "../../contexts/authReducer";
import { Modal } from "../../components/Modal";

type RegisterFormTypes = {
	username: string;
	password: string;
};

export const Register = () => {
	const navigate = useNavigate();

	const auth = useContext(AuthContext);
	const authDispatch = useContext(AuthDispatch) as React.Dispatch<AuthAction>;

	const [modal, setModal] = useState({
		open: false,
		message: {
			title: "Ops!",
			desc: "Ocorreu algum erro inesperado",
			button: "Tá (?)",
		},
	});

	const body = document.querySelector("#root");

	useEffect(() => {
		if (auth && auth.user.accessToken) navigate("/");
	}, []);

	const handleModalClose = () => {
		if (modal.open) setModal((prev) => ({ ...prev, open: false }));
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormTypes>();

	const onSubmit: SubmitHandler<RegisterFormTypes> = (data) => {
		registerNewAccount(data)
			.then((res) => {
				authDispatch({
					type: "register",
					payload: res.data.user,
				});
				localStorage.setItem("user", JSON.stringify(res.data.user));
				if (!modal.open)
					setModal((prev) => ({
						open: true,
						message: {
							title: "Feito!",
							desc: "Conta cadastrada com sucesso. Redirecionando...",
							button: "Ok!",
						},
					}));
				setTimeout(() => navigate("/"), 2000);
			})
			.catch((error) => {
				setModal((prev) => ({
					open: true,
					message: {
						title: "Ops!",
						desc: "Esse nome de usuário já foi usado antes.",
						button: "Revisar",
					},
				}));
			});
	};

	const onError: SubmitErrorHandler<RegisterFormTypes> = (errors) =>
		console.error("This is my error log: ", errors);

	return (
		<div className='w-full min-h-screen relative md:bg-ng md:bg-cover'>
			<Link
				to='/'
				className='fixed top-6 left-2 rounded'>
				<GoChevronLeft size={32} />
			</Link>
			<div className='flex flex-col lg:flex-row lg:flex-wrap py-10 px-12 md:p-12 justify-around items-center min-h-screen'>
				<div className='flex flex-col max-w-max'>
					<img
						src={logotype}
						alt='NG.CASH'
						width={60}
					/>
					<h1 className='font-semibold text-4xl whitespace-normal'>
						Faça parte da Nova Geração.
					</h1>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit, onError)}
					method='post'
					action='/api/register'
					className='flex flex-col gap-8 justify-center items-center p-8 mx-12 md:bg-black md:border md:border-primary md:rounded-md'>
					<div className='flex flex-col gap-4 justify-center items-center'>
						<div className='flex flex-col gap-2'>
							<label
								className='text-2xl font-semibold'
								htmlFor='username'>
								Digite um @nome
							</label>
							<div className='relative'>
								<input
									{...register("username", {
										required: true,
										minLength: 4,
										maxLength: 16,
										pattern: {
											value: /^[a-zA-Z0-9_]+$/,
											message:
												'O nome deve ter entre 4 e 16 letras e/ou números. Pode usar "_" como separador.',
										},
									})}
									id='username'
									type='text'
									placeholder='username_123'
									className='h-10 w-72 pl-8 placeholder:text-gray rounded-xl border border-solid border-primary bg-secondary'
								/>

								<span className='absolute left-4 top-2'>@</span>
							</div>
						</div>
						<div className='flex flex-col gap-2'>
							<label
								className='text-2xl font-semibold'
								htmlFor='password'>
								Crie uma senha
							</label>
							<input
								{...register("password", {
									required: true,
									minLength: 4,
									maxLength: 16,
								})}
								id='password'
								minLength={3}
								type='password'
								placeholder='Pense algo difícil.'
								className='h-10 w-72 pl-4 placeholder:text-gray rounded-xl border border-solid border-primary bg-secondary'
							/>
						</div>
					</div>
					{errors?.username && errors.username.message}
					<Button type='fancy'>CRIAR</Button>
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

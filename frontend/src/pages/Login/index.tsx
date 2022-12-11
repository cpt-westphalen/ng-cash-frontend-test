import logotypeGif from "../../assets/logo_ng_cash.38841a96a95927fdf7bf.gif";
import { GoChevronLeft } from "react-icons/go";

import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { loginToAccount } from "../../services/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthDispatch } from "../../contexts/AuthContext";
import { Modal } from "../../components/Modal";

type LoginFormTypes = {
	username: string;
	password: string;
};

export const Login = () => {
	const navigate = useNavigate();

	const auth = useContext(AuthContext);
	const authDispatch = useContext(AuthDispatch);

	const [modalMessage, setModalMessage] = useState({
		title: "Sucesso!",
		desc: "Seu login foi realizado, redirecionando...",
		button: "Ok!",
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const body = document.querySelector("#root");

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		if (auth && auth.user.accessToken) navigate("/");
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormTypes>();

	const onSubmit: SubmitHandler<LoginFormTypes> = (data) => {
		loginToAccount(data)
			.then((res) => {
				if (authDispatch)
					authDispatch({ type: "login", payload: res.data });
				setModalMessage((prev) => {
					setIsModalOpen(true);
					setTimeout(() => navigate("/"), 2000);
					return {
						title: "Sucesso!",
						desc: "Seu login foi realizado, redirecionando...",
						button: "Ok!",
					};
				});
			})
			.catch((error) => {
				console.warn(error);
				setModalMessage((state) => {
					setIsModalOpen(true);
					return {
						title: "Ops!",
						desc: "Os dados inseridos estão incorretos.",
						button: "Revisar",
					};
				});
			});
	};

	return (
		<div className='w-full min-h-screen relative md:bg-ng md:bg-cover'>
			<Link
				to='/'
				className='fixed top-6 left-2 rounded hover:scale-105 hover:-translate-x-1 transition '>
				<GoChevronLeft size={32} />
			</Link>
			<div className='flex flex-col justify-center items-center min-h-screen'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col justify-between items-center gap-4 mt-8 mb-12 p-8 md:px-32 md:pb-12 lg:pb-20 mx-12 md:bg-black md:border md:border-primary md:rounded-md'>
					<img
						src={logotypeGif}
						alt='NG.CASH'
						width={160}
					/>
					<div className='flex flex-col gap-4 justify-center items-center mb-4'>
						<div className='flex flex-col gap-2'>
							<label
								className='text-2xl font-semibold'
								htmlFor='username'>
								Usuário
							</label>
							<div className='relative'>
								<input
									{...register("username", {
										required: true,
									})}
									id='username'
									type='text'
									placeholder='Digite seu username'
									className='h-10 w-72 pl-8 placeholder:text-gray rounded-xl border border-solid border-primary bg-secondary'
								/>
								<span className='absolute left-4 top-2'>@</span>
							</div>
						</div>
						<div className='flex flex-col gap-2'>
							<label
								className='text-2xl font-semibold'
								htmlFor='password'>
								Senha
							</label>
							<input
								{...register("password", {
									required: true,
									minLength: 4,
								})}
								id='password'
								type='password'
								placeholder='Digite sua $eNh@.'
								className='h-10 w-72 pl-4 placeholder:text-gray rounded-xl border border-solid border-primary bg-secondary'
							/>
						</div>
					</div>
					<Button type='fancy'>ENTRAR</Button>
				</form>
			</div>
			<Modal
				type='message'
				message={modalMessage}
				props={{
					isOpen: isModalOpen,
					preventScroll: true,
					onRequestClose: handleModalClose,
					appElement: body,
				}}
			/>
		</div>
	);
};

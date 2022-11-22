import logotype from "../../assets/logo-ngcash-branco-simples.88c5860.svg";
import { GoChevronLeft } from "react-icons/go";

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

import { loginToAccount, registerNewAccount } from "../../api/auth";
import { useContext } from "react";
import { AuthDispatch } from "../../contexts/AuthContext";
import { AuthAction } from "../../contexts/authReducer";

type RegisterFormTypes = {
	username: string;
	password: string;
};

export const Register = () => {
	const navigate = useNavigate();

	const authDispatch = useContext(AuthDispatch) as React.Dispatch<AuthAction>;

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
					payload: { status: res.status, data: res.data },
				});
				sessionStorage.setItem("user", res.data);
				setTimeout(() => navigate("/"), 1000);
			})
			.catch((error) => {
				alert("Desculpe, esse nome de usuário já existe.");
			});
	};

	const onError: SubmitErrorHandler<RegisterFormTypes> = (errors) =>
		console.error("This is my error log: ", errors);

	return (
		<>
			<Link
				to='/'
				className='fixed top-6 left-2 rounded'>
				<GoChevronLeft size={32} />
			</Link>
			<div className='px-8 min-h-screen flex flex-col justify-evenly lg:justify-center items-stretch md:items-center'>
				<div className='flex flex-col my-24'>
					<img
						src={logotype}
						alt='NG.CASH'
						width={60}
					/>
					<h1 className='font-semibold text-4xl whitespace-normal'>
						{`Faça parte da Nova Geração.`}
					</h1>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit, onError)}
					method='post'
					action='/api/register'
					className='flex flex-col gap-8 justify-center items-center mb-10 lg:mb-32'>
					<div className='flex flex-row flex-wrap gap-4 justify-center items-center'>
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
		</>
	);
};

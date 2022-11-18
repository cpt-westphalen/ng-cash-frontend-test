import logotypeGif from "../../assets/logo_ng_cash.38841a96a95927fdf7bf.gif";
import { GoChevronLeft } from "react-icons/go";

import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { loginToAccount } from "../../services/auth";

type LoginFormTypes = {
	username: string;
	password: string;
};

export const Login = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormTypes>();

	const onSubmit: SubmitHandler<LoginFormTypes> = (data) => {
		loginToAccount(data).then(() => {
			navigate("/");
		});
	};

	return (
		<div className='min-h-screen flex flex-col justify-center items-center'>
			<Link to='/'>
				<button className='fixed top-6 left-2'>
					<GoChevronLeft size={32} />
				</button>
			</Link>
			<div className='px-8 min-h-screen max-w-5xl flex flex-col justify-evenly lg:justify-center items-stretch'>
				<img
					src={logotypeGif}
					alt='NG.CASH'
					width={160}
					className={"self-center lg:mb-24"}
				/>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-8 justify-center items-center lg:mb-32'>
					<div className='flex flex-row flex-wrap gap-4 justify-center items-center'>
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
		</div>
	);
};
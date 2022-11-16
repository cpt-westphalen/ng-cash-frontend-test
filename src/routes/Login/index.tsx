import logotype from "../../assets/logo-ngcash-branco-simples.88c5860.svg";
import { GoChevronLeft } from "react-icons/go";

import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

export const Login = () => {
	const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		console.log("login clicked");
	};

	return (
		<>
			<Link to='/'>
				<button className='fixed top-6 left-2'>
					<GoChevronLeft size={32} />
				</button>
			</Link>
			<div className='h-screen flex flex-col justify-evenly items-center'>
				<div className='flex flex-col'>
					<img
						src={logotype}
						alt='NG.CASH'
						width={60}
					/>
					<h1 className='font-semibold text-4xl whitespace-pre-wrap'>
						{`A Carteira Digital \nda Nova Geração.`}
					</h1>
				</div>
				<div>
					<form className='flex flex-row flex-wrap gap-8 justify-center'>
						<div className='flex flex-col gap-2'>
							<label
								className='text-2xl font-semibold'
								htmlFor='username'>
								Usuário
							</label>
							<div className='relative'>
								<input
									id='username'
									minLength={3}
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
								id='password'
								minLength={3}
								type='password'
								placeholder='Digite sua $eNh@.'
								className='h-10 w-72 pl-4 placeholder:text-gray rounded-xl border border-solid border-primary bg-secondary'
							/>
						</div>
						<Button
							type='fancy'
							onClick={handleLogin}>
							ENTRAR
						</Button>
					</form>
				</div>
			</div>
		</>
	);
};

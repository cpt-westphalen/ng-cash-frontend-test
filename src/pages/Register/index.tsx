import logotype from "../../assets/logo-ngcash-branco-simples.88c5860.svg";
import { GoChevronLeft } from "react-icons/go";

import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

export const Register = () => {
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
				<form className='flex flex-col gap-8 justify-center items-center mb-10 lg:mb-32'>
					<div className='flex flex-row flex-wrap gap-4 justify-center items-center'>
						<div className='flex flex-col gap-2'>
							<label
								className='text-2xl font-semibold'
								htmlFor='username'>
								Digite um @nome
							</label>
							<div className='relative'>
								<input
									id='username'
									minLength={3}
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
								id='password'
								minLength={3}
								type='password'
								placeholder='Pense algo difícil.'
								className='h-10 w-72 pl-4 placeholder:text-gray rounded-xl border border-solid border-primary bg-secondary'
							/>
						</div>
					</div>
					<Button
						type='fancy'
						onClick={handleLogin}>
						CRIAR
					</Button>
				</form>
			</div>
		</>
	);
};

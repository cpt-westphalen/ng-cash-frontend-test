import { Link } from "react-router-dom";

import logotype from "../../assets/logo-ngcash-branco-simples.88c5860.svg";

import { Button } from "../Button";

export const Home = () => {
	const handleLoginRoute: React.MouseEventHandler<HTMLButtonElement> = (
		event
	) => {
		console.log("login clicked");
	};
	const handleRegisterRoute: React.MouseEventHandler<HTMLButtonElement> = (
		event
	) => {
		console.log("register clicked");
	};

	return (
		<div className='px-8 min-h-screen flex flex-col justify-evenly lg:justify-center items-stretch md:items-center'>
			<div className='flex flex-col my-24'>
				<img
					src={logotype}
					alt='NG.CASH'
					width={60}
				/>
				<h1 className='font-semibold text-4xl whitespace-normal'>
					{`A Carteira Digital \nda Nova Geração.`}
				</h1>
			</div>
			<div className='flex flex-row flex-wrap gap-8 justify-center lg:mb-32'>
				<Link
					to='/login'
					className='max-h-min flex-grow-0'>
					<Button
						type='minimalist'
						onClick={handleLoginRoute}>
						Entrar na conta
					</Button>
				</Link>
				<Link
					to='/register'
					className='max-h-min flex-grow-0'>
					<Button
						type='minimalist'
						className='text-gray border-gray hover:text-primary hover:border-primary'
						onClick={handleRegisterRoute}>
						Criar conta
					</Button>
				</Link>
			</div>
		</div>
	);
};

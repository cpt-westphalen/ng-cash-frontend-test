import { Link } from "react-router-dom";

import logotype from "../../assets/logo-ngcash-branco-simples.88c5860.svg";

import { Button } from "../../components/Button";

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
			<div className='flex flex-row flex-wrap gap-8 justify-center'>
				<Link to='/login'>
					<Button
						type='minimalist'
						onClick={handleLoginRoute}>
						Entrar na conta
					</Button>
				</Link>
				<Button
					type='minimalist'
					className='text-gray border-gray hover:text-primary hover:border-primary'
					onClick={handleRegisterRoute}>
					Criar conta
				</Button>
			</div>
		</div>
	);
};

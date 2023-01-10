import { Link } from "react-router-dom";

import logotype from "../../../assets/logo-ngcash-branco-simples.88c5860.svg";

import { Button } from "../../../components/Button";

export const Home = () => {
	return (
		<div className='w-full min-h-screen relative md:bg-ng md:bg-cover flex md:justify-center md:items-center'>
			<div className='max-w-3xl p-8 md:p-12 flex flex-col justify-around md:justify-center items-center md:bg-black md:border md:border-primary md:rounded-md'>
				<div className='flex flex-col my-24 md:mb-24 md:mt-12'>
					<img
						src={logotype}
						alt='NG.CASH'
						width={60}
					/>
					<h1 className='font-semibold text-4xl whitespace-normal'>
						{`A Carteira Digital \nda Nova Geração.`}
					</h1>
				</div>
				<div className='flex flex-col gap-8 justify-center items-center'>
					<Link
						to='/login'
						className='max-h-min flex-grow-0'>
						<Button type='minimalist'>Entrar na conta</Button>
					</Link>
					<Link
						to='/register'
						className='max-h-min flex-grow-0'>
						<Button
							type='minimalist'
							className='text-gray border-hidden hover:border-primary'>
							Criar conta
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

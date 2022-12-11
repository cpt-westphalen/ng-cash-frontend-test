import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
	const error = useRouteError();
	console.error(error);

	return (
		<div className='h-screen flex flex-col justify-center items-center gap-11'>
			<p className='text-6xl font-black'>404</p>
			<p className='text-lg'>Página não encontrada</p>
		</div>
	);
};

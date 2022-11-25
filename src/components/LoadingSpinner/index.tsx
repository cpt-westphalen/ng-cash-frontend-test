export const LoadingSpinner = () => {
	return (
		<div
			id='spinner-overlay'
			className='fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-tr from-zinc-900 to-zinc-800 opacity-80 flex justify-center items-center'>
			<div
				id='spinner'
				className='spinner'
			/>
		</div>
	);
};

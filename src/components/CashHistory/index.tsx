export const CashHistoryButton = ({
	onClick,
}: {
	onClick: React.MouseEventHandler;
}) => {
	return (
		<div className='flex flex-col justify-center'>
			<button
				className='px-12 py-2 font-bold self-center bg-primary text-secondary rounded-t'
				onClick={onClick}>
				HISTÓRICO
			</button>
		</div>
	);
};

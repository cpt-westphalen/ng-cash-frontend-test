type FancyButtonProps = {
	className?: string;
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const defaultClasses =
	"relative w-72 h-11 text-secondary font-semibold bg-primary border border-solid border-secondary rounded-xl ";

export const Fancy = ({
	className = "",
	children,
	onClick,
}: FancyButtonProps) => {
	return (
		<div className='relative w-fit'>
			<div className='absolute top-1 left-1 w-full h-full border border-solid border-gray-light rounded-xl' />
			<button
				className={defaultClasses + className}
				onClick={onClick}>
				{children}
			</button>
		</div>
	);
};

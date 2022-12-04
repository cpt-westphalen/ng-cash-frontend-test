type MinimalistButtonProps = {
	className?: string;
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const defaultClasses =
	"font-semibold w-64 h-11 bg-secondary border border-solid border-primary rounded-xl hover:bg-primary hover:text-secondary transition ";

export const Minimalist = ({
	className = "",
	children,
	onClick,
}: MinimalistButtonProps) => {
	return (
		<button
			className={defaultClasses + className}
			onClick={onClick}>
			{children}
		</button>
	);
};

type MinimalistButtonProps = {
	className?: string;
	children: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const defaultClasses =
	"w-64 h-11 bg-secondary border border-solid border-primary rounded-xl ";

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

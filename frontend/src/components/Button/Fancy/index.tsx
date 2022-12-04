type FancyButtonProps = {
	className?: string;
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	theme?: "light" | "dark";
};

export const Fancy = ({
	className = "",
	children,
	onClick,
	theme,
}: FancyButtonProps) => {
	const defaultClasses =
		theme === "dark"
			? "relative w-72 h-11 text-primary text-lg font-semibold bg-secondary rounded-xl "
			: "relative w-72 h-11 text-secondary text-lg font-semibold bg-primary border border-solid border-secondary rounded-xl hover:scale-105 transition ";

	return (
		<div className='relative w-fit'>
			<div
				className={`absolute top-1 left-1 w-full h-full border border-solid ${
					theme == "dark" ? "border-secondary" : "border-gray-light"
				} rounded-xl`}
			/>
			<button
				className={defaultClasses + className}
				onClick={onClick}>
				{children}
			</button>
		</div>
	);
};

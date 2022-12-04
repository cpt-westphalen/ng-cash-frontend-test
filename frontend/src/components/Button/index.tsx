import { Fancy } from "./Fancy";
import { Minimalist } from "./Minimalist";

type ButtonProps = {
	type: "minimalist" | "fancy" | "inverted";
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
	children: React.ReactNode;
	theme?: "light" | "dark";
};

export const Button = ({
	type,
	onClick,
	className,
	children,
	theme,
}: ButtonProps) => {
	switch (type) {
		case "minimalist":
			return (
				<Minimalist
					className={className}
					onClick={onClick}>
					{children}
				</Minimalist>
			);
		case "fancy":
			return (
				<Fancy
					className={className}
					onClick={onClick}
					theme={theme}>
					{children}
				</Fancy>
			);
		default:
			return (
				<button
					className={className}
					onClick={onClick}>
					{children}
				</button>
			);
	}
};

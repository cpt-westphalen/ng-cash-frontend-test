import { Fancy } from "./Fancy";
import { Minimalist } from "./Minimalist";

type ButtonProps = {
	type: "minimalist" | "fancy" | "inverted";
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
	children: React.ReactNode;
};

export const Button = ({ type, onClick, className, children }: ButtonProps) => {
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
					onClick={onClick}>
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

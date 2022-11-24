import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { cashToLocaleString } from "../../utils/cashFormatter";

type CashDisplayProps = {
	title: string;
	cash: number;
	display: {
		hide: boolean;
		toggle: (callback: (s: boolean) => boolean) => void;
	};
};

export const CashDisplay = ({ title, cash, display }: CashDisplayProps) => {
	function handleDisplayToggle() {
		display.toggle((prevState) => !prevState);
	}

	if (display) {
		const EyeIcon = display.hide ? (
			<button
				onClick={handleDisplayToggle}
				aria-label={"Mostrar saldo"}
				className='text-gray hover:text-white transition'>
				<AiFillEye size={30} />
			</button>
		) : (
			<button
				onClick={handleDisplayToggle}
				aria-label={"Esconder saldo"}>
				<AiFillEyeInvisible size={30} />
			</button>
		);

		const cashFormattedValue = cashToLocaleString(cash);

		return (
			<div className='my-6 w-[95%] md:w-[60%] justify-self-center self-center'>
				<div className='flex flex-row'>
					<h1
						id='title'
						className='text-2xl font-semibold flex-1'>
						{title}
					</h1>
					<div className='mx-1'>{EyeIcon}</div>
				</div>
				<div
					className={`h-12 py-1 text-3xl flex justify-center items-center bg-secondary border border-solid border-primary rounded-lg transition-transform`}>
					{display.hide && <h2>---</h2>}
					<div
						className={`transition ${
							display.hide ? "scale-y-0 " : "scale-y-100 "
						}`}>
						{display.hide || (
							<h2 aria-labelledby='title'>
								R${" "}
								<span className='font-bold'>
									{cashFormattedValue}
								</span>
							</h2>
						)}
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<h1>{title}</h1>
				<div className='h-10 bg-secondary border border-solid border-primary rounded'>
					<h2>R$ {cash / 100}</h2>
				</div>
			</div>
		);
	}
};

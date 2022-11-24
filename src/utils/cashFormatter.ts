export const cashToLocaleString = (cash: number) => {
	try {
		const value = cash / 100;
		let result = value.toLocaleString("pt-br", {
			currency: "BRL",
			minimumFractionDigits: 2,
		});
		return result;
	} catch (error) {
		return cashFormatter(cash);
	}
};

const cashFormatter = (cash: number) => {
	let formattedString = "";

	const isNegative = cash < 0 ? true : false;

	formattedString = Math.abs(cash).toString();

	if (formattedString.length < 4) {
		formattedString = formattedString.padStart(4, "0");
	}

	formattedString =
		formattedString.slice(0, -2) + "," + formattedString.slice(-2);

	if (isNegative) formattedString = "- " + formattedString;

	return formattedString;
};

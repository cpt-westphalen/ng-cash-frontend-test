export const cashFormatter = (cash: number) => {
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

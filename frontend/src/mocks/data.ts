type TransferDisplayFormat = [
	created_at: string,
	type: "in" | "out",
	username: string,
	amount: number
];

export const mockTransfers: TransferDisplayFormat[] = [
	["2022-11-14 15:30:00", "out", "outro_user_21", 10000],
	["2022-11-14 15:30:00", "in", "outro_user_21", 10000],
	["2022-11-13 15:30:00", "out", "username25", 2000],
	["2022-11-05 15:30:00", "out", "outro_user_maior_ainda", 1723],
	["2022-11-01 16:35:34", "out", "outro_user_menor", 1723],
	["2022-11-01 10:11:55", "in", "brotherzito99", 1239],
	["2022-11-01 09:42:15", "out", "Padaria Marconi", 10000],
	["2022-10-14 15:30:00", "in", "outro_user_21", 10000],
	["2022-10-13 15:30:00", "out", "username25", 2000],
	["2022-10-05 15:30:00", "out", "outro_user_maior_ainda", 1723],
	["2022-09-01 16:35:34", "out", "outro_user_menor", 1723],
	["2022-08-01 10:11:55", "in", "brotherzito99", 1239],
	["2022-08-01 09:42:15", "out", "Padaria Marconi", 10000],
	["2022-07-14 15:30:00", "in", "outro_user_21", 10000],
	["2022-07-13 15:30:00", "out", "username25", 2000],
	["2022-07-05 15:30:00", "out", "outro_user_maior_ainda", 1723],
	["2022-07-01 16:35:34", "out", "outro_user_menor", 1723],
	["2022-07-01 10:07:55", "in", "brotherzito99", 1239],
	["2022-07-01 09:42:15", "out", "Padaria Marconi", 10000],
	["2022-06-14 15:30:00", "in", "outro_user_21", 10000],
	["2022-06-13 15:30:00", "out", "username25", 2000],
	["2022-06-05 15:30:00", "out", "outro_user_maior_ainda", 1723],
	["2022-06-01 16:35:34", "out", "outro_user_menor", 1723],
	["2022-06-01 10:06:55", "in", "brotherzito99", 1239],
	["2022-06-01 09:42:15", "out", "Padaria Marconi", 10000],
];

export interface UserType {
	id: string;
	username: string;
	accessToken: string;
	account: AccountType;
}

export type AccountType = {
	id: string;
	balance: number;
};

export interface APIUserData extends UserType {
	password: string;
	account: AccountType;
	transfers: string[];
}

export const usersDB: APIUserData[] = [
	{
		id: "0000",
		username: "admin",
		password: "1234",
		accessToken: "",
		account: {
			id: "000001",
			balance: 10000,
		},
		transfers: [],
	},
];

export const logAllUsers = () => {
	console.log(usersDB);
};

export const generateToken = () => {
	return Math.floor(Math.random() * 1000000).toString();
};

export function addUser(data: { username: string; password: string }) {
	const newUser = {
		id: Math.floor(Math.random() * 10000).toString(),
		username: data.username.toLowerCase(),
		password: data.password,
		accessToken: generateToken(),
		account: {
			id: generateToken(),
			balance: 10000,
		},
		transfers: [],
	};
	usersDB.push(newUser);
	return newUser;
}

export function login(credentials: { username: string; password: string }) {
	credentials.username = credentials.username.toLowerCase();
	const user = usersDB.find(
		(user) =>
			user.username === credentials.username &&
			user.password === credentials.password
	);
	if (user) {
		const newToken = generateToken();
		user.accessToken = newToken; // modify in db
		return {
			username: user.username,
			id: user.id,
			accessToken: newToken,
			account: { id: user.account.id, balance: 0 },
		};
	} else {
		throw new Error("Invalid credentials");
	}
}

export function findUserByAccount(accountId: string) {
	return usersDB.find((user) => user.account.id === accountId);
}

export function findUserByUsername(username: string) {
	username = username.toLowerCase();
	return usersDB.find((user) => user.username === username);
}

export interface UserType {
	user_id: string;
	username: string;
	accessToken: string;
	account: AccountType;
}

export type AccountType = {
	id: string;
	balance: number;
};

// export interface APIUserData extends UserType {
// 	password: string;
// }

// export const usersDB: APIUserData[] = [
// 	{
// 		user_id: "0000",
// 		username: "admin",
// 		password: "1234",
// 		accessToken: "abcdefghijklmnop",
// 		account_id: "000001",
// 	},
// ];

// export const logAllUsers = () => {
// 	console.log(usersDB);
// };

// export const generateToken = () => {
// 	return Math.floor(Math.random() * 1000000).toString();
// };

// export function addUser(data: { username: string; password: string }) {
// 	const newUser = {
// 		user_id: Math.floor(Math.random() * 10000).toString(),
// 		username: data.username.toLowerCase(),
// 		password: data.password,
// 		accessToken: generateToken(),
// 		account_id: generateToken(),
// 	};
// 	usersDB.push(newUser);
// 	return newUser;
// }

// export function login(credentials: { username: string; password: string }) {
// 	credentials.username = credentials.username.toLowerCase();
// 	const user = usersDB.find(
// 		(user) =>
// 			user.username === credentials.username &&
// 			user.password === credentials.password
// 	);
// 	if (user) {
// 		const newToken = generateToken();
// 		user.accessToken = newToken; // modify in db
// 		return {
// 			username: user.username,
// 			user_id: user.user_id,
// 			accessToken: newToken,
// 			account_id: user.account_id,
// 		};
// 	} else {
// 		throw new Error("Invalid credentials");
// 	}
// }

// export function findUserByAccount(accountId: string) {
// 	return usersDB.find((user) => user.account_id === accountId);
// }

// export function findUserByUsername(username: string) {
// 	username = username.toLowerCase();
// 	return usersDB.find((user) => user.username === username);
// }

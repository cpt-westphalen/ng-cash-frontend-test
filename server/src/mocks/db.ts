import { accounts_db, DbAccountType } from "./accounts.db";
import { DbTransactionType, transactions_db } from "./transactions.db";
import { DbUserType, users_db } from "./users.db";

type dbTypes = {
	users: DbUserType[];
	accounts: DbAccountType[];
	transactions: DbTransactionType[];
};

const db: dbTypes = {
	users: users_db,
	accounts: accounts_db,
	transactions: transactions_db,
};

export default db;

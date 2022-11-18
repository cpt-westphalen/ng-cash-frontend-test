import { useContext, useEffect, useState } from "react";
import { getBalance } from "../../api/account";
import { Button } from "../../components/Button";
import { UserContext, UserCtxType } from "../../contexts/UserContext";

type AccountType = {
	id: string;
	balance: number;
};

export const Account = () => {
	const [account, setAccount] = useState<AccountType>();
	const user = useContext(UserContext);

	useEffect(() => {
		const { id, accessToken } = user as UserCtxType;
		console.log("user is: ", user);
		const targetCredentials = { id, accessToken };
		getBalance(targetCredentials).then((data) => setAccount(data));
	}, []);

	return (
		<div>
			<button
				onClick={() => {
					(user as UserCtxType).logout();
				}}>
				Logout?
			</button>
			<h2>ae, @{user?.username}</h2>
			<div>
				<h1>Saldo atual</h1>
				<button>Exibir</button>
				<div>
					{account?.balance && <h2>R$ {account.balance / 100}</h2>}
				</div>
			</div>
			<nav>
				<ul>
					<li>
						<Button type='fancy'>Transferir</Button>
						<Button type='fancy'>Receber</Button>
					</li>
				</ul>
			</nav>
		</div>
	);
};

import { useContext } from "react";
import { Button } from "../../components/Button";
import { UserContext } from "../../contexts/UserContext";

export const Account = () => {
	const user = useContext(UserContext);

	return (
		<div>
			<h2>ae, @{user?.username}</h2>
			<div>
				<h1>Saldo atual</h1>
				<button>Exibir</button>
				<div>
					<h2>R$ 100,00</h2>
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

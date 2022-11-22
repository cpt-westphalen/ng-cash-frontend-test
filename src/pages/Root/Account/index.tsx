import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext, UserCtxType } from "../../../contexts/UserContext";

import { getBalance } from "../../../api/account";

import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { CashDisplay } from "../../../components/CashDisplay";
import { CashHistory } from "../../../components/CashHistory";

import { MdOutlineClose } from "react-icons/md";

type AccountType = {
	id: string;
	balance: number;
};

export const Account = () => {
	const navigate = useNavigate();

	const user = useContext(UserContext) as UserCtxType;

	const [account, setAccount] = useState<AccountType>();
	const [showCash, setShowCash] = useState(false);
	const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);

	useEffect(() => {
		const redirectToLogin = () => {
			setAccount(undefined);
			alert("Ops, ocorreu um problema. Por favor, faça login.");
			navigate("/login");
		};

		if (!user) redirectToLogin();
		if (!user.accessToken) {
			user.logout();
			redirectToLogin();
		}

		const { id, accessToken } = user;
		const targetCredentials = { id, accessToken };

		getBalance(targetCredentials)
			.then((data) => setAccount(data))
			.catch((error) => {
				console.log(error);
				user.logout();
				redirectToLogin();
			});
	}, []);

	const handleModalClose = () => {
		setLogoutModalIsOpen(false);
	};

	if (account && user)
		return (
			<div className='min-h-screen max-w-4xl mx-auto px-12 pt-10 lg:pt-24 flex flex-col justify-center'>
				<button
					aria-label='Sair da conta'
					className='absolute flex gap-2 items-center top-0 right-0 m-3 px-2 py-1 rounded group'
					onClick={() => {
						setLogoutModalIsOpen(true);
					}}>
					<p
						aria-hidden
						className='translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-right transition overflow-hidden font-semibold'>
						Logout?
					</p>
					<MdOutlineClose size={20} />
				</button>
				<h2 className='mt-16 mb-4 flex-grow text-3xl font-semibold whitespace-pre-wrap'>
					{`eae, \n@${user.username}`}
				</h2>
				<div className='flex-1 flex flex-col pb-16'>
					<CashDisplay
						title='Saldo atual'
						cash={account.balance}
						display={{ hide: !showCash, toggle: setShowCash }}
					/>
					<nav>
						<ul className='py-6 flex flex-col justify-center items-center gap-3'>
							<li>
								<Button
									type='fancy'
									className='hover:scale-105 transition
								'>
									Transferir
								</Button>
							</li>
							<li>
								<Button
									type='fancy'
									className='hover:scale-105 transition'>
									Receber
								</Button>
							</li>
							<li>
								<CashHistory />
							</li>
						</ul>
					</nav>
				</div>
				<Modal
					type='logout'
					props={{
						isOpen: logoutModalIsOpen,
						preventScroll: true,
						onRequestClose: handleModalClose,
					}}
				/>
			</div>
		);
	else {
		return <div>Loading...</div>;
	}
};

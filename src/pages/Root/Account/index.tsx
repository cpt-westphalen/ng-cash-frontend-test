import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	AccountType,
	AuthContext,
	AuthDispatch,
	UserType,
} from "../../../contexts/AuthContext";
import { AuthAction } from "../../../contexts/authReducer";

import { getAccount } from "../../../api/account";

import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { CashDisplay } from "../../../components/CashDisplay";
import { CashHistory } from "../../../components/CashHistory";

import { MdOutlineClose } from "react-icons/md";

export const Account = () => {
	const navigate = useNavigate();

	const user = useContext(AuthContext) as UserType;
	const authDispatch = useContext(AuthDispatch) as React.Dispatch<AuthAction>;

	const [showCash, setShowCash] = useState(false);
	const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);

	const body = document.querySelector("#root");

	useEffect(() => {
		const redirectToLogin = () => {
			authDispatch({
				type: "logout",
				payload: {
					message: "Ops, ocorreu um problema. Por favor, faça login.",
				},
			});
			navigate("/login");
		};

		const checkUserBalance = async () => {
			if (!user || !user.accessToken) redirectToLogin();

			const {
				accessToken,
				account: { id },
			} = user;
			const targetCredentials = {
				accessToken,
				account: { id },
			};

			getAccount(targetCredentials)
				.then((account: AccountType) => {
					console.log(account.id, account.balance);
					authDispatch({ type: "update_balance", payload: account });
				})
				.catch((error) => {
					authDispatch({
						type: "logout",
						payload: { message: "Ocorreu um erro. Faça login." },
					});
				});
		};

		checkUserBalance();
		const intervalHandle = setInterval(checkUserBalance, 5000);

		return () => {
			clearInterval(intervalHandle);
		};
	}, []);

	const handleModalClose = () => {
		setLogoutModalIsOpen(false);
	};

	if (user && user.account.balance !== undefined)
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
						cash={user.account.balance}
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
						appElement: body,
					}}
				/>
			</div>
		);
	else {
		return <div>Loading...</div>;
	}
};

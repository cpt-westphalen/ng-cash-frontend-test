import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext, AuthDispatch } from "../../../contexts/AuthContext";
import { AccountType, UserType } from "../../../mocks/userServices";
import { AuthAction } from "../../../contexts/authReducer";

import { checkUserBalance } from "../../../services/account";

import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { CashDisplay } from "../../../components/CashDisplay";
import { CashHistoryButton } from "../../../components/CashHistory";

import { MdOutlineClose } from "react-icons/md";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { TransactionHistory } from "../../../components/TransactionHistory";

export const Account = () => {
	const navigate = useNavigate();

	const user = useContext(AuthContext) as UserType;
	const authDispatch = useContext(AuthDispatch) as React.Dispatch<AuthAction>;

	const [showCash, setShowCash] = useState(false);
	const [isHistoryOpen, setIsHistoryOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const body = document.querySelector("#root");

	useEffect(() => {
		const redirectToLogin = () => {
			authDispatch({
				type: "logout",
				payload: {
					message: "Ops, ocorreu um problema. Por favor, faça login.",
				},
			});
			setTimeout(() => navigate("/login"), 1000);
		};

		const updateUserBalanceCallback = (account: AccountType) => {
			authDispatch({
				type: "update_balance",
				payload: account,
			});
		};

		checkUserBalance(user, updateUserBalanceCallback, redirectToLogin);

		const intervalHandle = setInterval(() => {
			checkUserBalance(user, updateUserBalanceCallback, redirectToLogin);
		}, 10000);

		return () => {
			clearInterval(intervalHandle);
		};
	}, []);

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleHistoryClick = (event: React.MouseEvent) => {
		setIsHistoryOpen((prev) => !prev);
	};

	if (user && user.account.balance !== undefined)
		return (
			<div className='min-h-screen max-w-4xl mx-auto px-12 pt-10 lg:pt-24 flex flex-col justify-center'>
				<button
					aria-label='Sair da conta'
					className='absolute flex gap-2 items-center top-0 right-0 m-3 px-2 py-1 max-w-fit bg-black rounded group'
					onClick={() => {
						setIsModalOpen(true);
					}}>
					<p
						aria-hidden
						className='translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-right transition overflow-hidden font-semibold'>
						Logout?
					</p>
					<MdOutlineClose size={20} />
				</button>
				<h2 className='mt-[10vh] flex-grow text-3xl md:text-5xl md:font-bold font-semibold whitespace-pre-wrap md:leading-normal leading-snug'>
					eae,{" \n"}
					<span className='bg-primary text-secondary text-4xl md:text-5xl'>{`@${user.username}`}</span>
				</h2>
				<div className='flex-1 flex flex-col pb-16'>
					<CashDisplay
						className='md:py-12 md:px-8 md:rounded-lg md:border-b md:border-zinc-900 md:bg-black'
						title='Saldo atual'
						cash={user.account.balance}
						display={{ hide: !showCash, toggle: setShowCash }}
					/>
					<div className='py-6 flex flex-col justify-center items-center gap-3'>
						<Link to='/transfer'>
							<Button
								type='fancy'
								className='hover:scale-105 transition'>
								Transferir
							</Button>
						</Link>
						<div
							className={
								isHistoryOpen
									? "flex flex-col absolute pt-4 top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.9)]"
									: "fixed bottom-0 left-0 right-0"
							}>
							<CashHistoryButton onClick={handleHistoryClick} />
							<div className='flex-1 max-w-7xl self-center'>
								{isHistoryOpen && (
									<TransactionHistory
										user={user as UserType}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
				<Modal
					type='logout'
					props={{
						isOpen: isModalOpen,
						preventScroll: true,
						onRequestClose: handleModalClose,
						appElement: body,
					}}
				/>
			</div>
		);
	else {
		return <LoadingSpinner />;
	}
};

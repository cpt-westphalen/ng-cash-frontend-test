import ReactModal from "react-modal";

import { useContext } from "react";

import { AuthDispatch } from "../../contexts/AuthContext";

import { Button } from "../Button";

import { MdOutlineClose } from "react-icons/md";
import { AuthAction } from "../../contexts/authReducer";

type ModalProps = {
	type:
		| "logout"
		| "login-success"
		| "login-fail"
		| "register-success"
		| "register-fail";
	props: any;
};

export const Modal = ({ type, props }: ModalProps) => {
	const authDispatch = useContext(AuthDispatch) as React.Dispatch<AuthAction>;

	function handleLogout() {
		authDispatch({
			type: "logout",
			payload: { message: "Você saiu da sua conta." },
		});
	}

	switch (type) {
		case "logout":
			return (
				<ReactModal
					{...props}
					className='py-4 px-8 gap-3 flex flex-col justify-center items-stretch rounded-2xl bg-primary text-secondary absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'
					overlayClassName={
						"fixed top-0 left-0 right-0 bottom-0 bg-secondary bg-opacity-90"
					}>
					<button
						aria-label='Cancelar'
						className='absolute top-0 right-0 m-3 p-1 rounded'
						onClick={() => {
							props.onRequestClose();
						}}>
						<MdOutlineClose size={18} />
					</button>
					<div className='flex-0 w-max'>
						<h1
							id='heading'
							className='text-3xl text-secondary font-semibold'>
							Sair?
						</h1>
						<p
							id='full-description'
							className='text-'>
							Deseja se desconectar?
						</p>
					</div>
					<div className='flex justify-center items-center'>
						<Button
							type='fancy'
							theme='dark'
							className='w-28'
							onClick={handleLogout}>
							Logout
						</Button>
					</div>
				</ReactModal>
			);
		default:
			return <ReactModal {...props} />;
	}
};

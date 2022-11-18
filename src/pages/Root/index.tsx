import { useEffect, useState } from "react";
import { Home } from "../../components/Home";

type UserTypes = {
	id: string;
	username: string;
	accessToken: string;
};

function Root() {
	const [user, setUser] = useState<UserTypes>();
	const isAuth: boolean = user && user.accessToken ? true : false;

	useEffect(() => {
		const localUserDataString = sessionStorage.getItem("user");
		if (localUserDataString) {
			const localUserData: UserTypes = JSON.parse(localUserDataString);
			if (user?.accessToken !== localUserData.accessToken) {
				setUser(localUserData);
			}
		}
	}, []);

	return (
		<>
			{isAuth ? (
				<button
					onClick={() => {
						sessionStorage.removeItem("user");
						setUser(undefined);
					}}>
					Logout?
				</button>
			) : (
				<Home />
			)}
		</>
	);
}

export default Root;

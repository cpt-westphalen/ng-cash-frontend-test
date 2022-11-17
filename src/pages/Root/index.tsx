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
		const localUserDataString = localStorage.getItem("user");
		if (localUserDataString) {
			const localUserData: UserTypes = JSON.parse(localUserDataString);
			if (user?.accessToken !== localUserData.accessToken) {
				setUser(localUserData);
			}
		}
	}, []);

	return <>{isAuth ? <p>Account</p> : <Home />}</>;
}

export default Root;

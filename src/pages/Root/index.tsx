import { useContext } from "react";
import { Home } from "../../components/Home";
import { UserContext } from "../../contexts/UserContext";

function Root() {
	const user = useContext(UserContext);

	return (
		<>
			{user?.accessToken ? (
				<button
					onClick={() => {
						user.logout();
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

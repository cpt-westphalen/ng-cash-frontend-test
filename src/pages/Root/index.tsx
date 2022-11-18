import { useContext } from "react";
import { Home } from "../../components/Home";
import { UserContext } from "../../contexts/UserContext";
import { Account } from "../Account";

function Root() {
	const user = useContext(UserContext);

	return <>{user?.accessToken ? <Account /> : <Home />}</>;
}

export default Root;

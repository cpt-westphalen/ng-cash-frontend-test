import { useContext, useEffect } from "react";
import { Home } from "./Home";
import { AuthContext } from "../../contexts/AuthContext";
import { Account } from "./Account";

function Root() {
	const auth = useContext(AuthContext);

	return <>{auth?.user.accessToken ? <Account /> : <Home />}</>;
}

export default Root;

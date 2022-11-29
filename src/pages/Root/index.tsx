import { useContext, useEffect } from "react";
import { Home } from "./Home";
import { AuthContext } from "../../contexts/AuthContext";
import { Account } from "./Account";
import { TransactionHistory } from "../../components/TransactionHistory";

function Root() {
	const user = useContext(AuthContext);

	// return (
	// 	<div className='md:bg-ng md:bg-cover'>
	// 		{user?.accessToken ? <Account /> : <Home />}
	// 	</div>
	// );

	return <TransactionHistory />;
}

export default Root;

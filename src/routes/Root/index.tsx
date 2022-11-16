import { Home } from "../Home";

const isloggedin = false;

function Root() {
	return <>{isloggedin ? <p>ops</p> : <Home />}</>;
}

export default Root;

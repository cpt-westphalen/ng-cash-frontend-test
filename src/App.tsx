import { GoChevronLeft } from "react-icons/go";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";

function App() {
	return (
		<div>
			<button className='fixed top-6 left-2'>
				<GoChevronLeft size={32} />
			</button>
			<Home />
		</div>
	);
}

export default App;

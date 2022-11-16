import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Root from "./routes/Root";
import { Login } from "./routes/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage } from "./error-page";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Root />}
					errorElement={<ErrorPage />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

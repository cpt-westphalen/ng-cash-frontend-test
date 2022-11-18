import React from "react";
import ReactDOM from "react-dom/client";

import { ROUTES } from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

import "./index.css";

import { worker } from "./mocks/browser";

worker.start();

const router = createBrowserRouter(ROUTES);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	</React.StrictMode>
);

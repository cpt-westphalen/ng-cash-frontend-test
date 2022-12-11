import React from "react";
import ReactDOM from "react-dom/client";

import { ROUTES } from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import "./index.css";

// if (import.meta.env.NODE_ENV === "development") {
// 	const worker = require("./mocks/browser");
// 	worker.start({ onUnhandledRequest: "bypass" });
// }

const router = createBrowserRouter(ROUTES);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);

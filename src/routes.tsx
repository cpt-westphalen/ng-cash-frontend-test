import { RouteObject } from "react-router-dom";

import Root from "./pages/Root";
import { ErrorPage } from "./error-page";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const ROUTES: RouteObject[] = [
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
];

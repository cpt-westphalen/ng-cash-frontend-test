import express, { Request, Response } from "express";
import path from "path";
import { routes } from "./routes";

const app = express();
app.use(express.static(path.resolve(__dirname, "..", "frontend")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/", routes);

app.get("*", (req: Request, res: Response) => {
	res.status(200).sendFile(
		path.resolve(__dirname, "..", "frontend", "index.html")
	);
});

export default app;

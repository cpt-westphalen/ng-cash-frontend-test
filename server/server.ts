import express, { Express, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { routes } from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.resolve(__dirname, "frontend")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/", routes);

app.get("*", (req: Request, res: Response) => {
	res.status(200).sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () =>
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
);

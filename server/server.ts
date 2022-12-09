import dotenv from "dotenv";
import app from "./src/app";
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
);

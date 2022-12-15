import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		port: 5173,
		proxy: {
			// "/api": "http://server:3000", // switch to this when in docker-compose
			"/api": "http://localhost:3000", // switch to this when in local machine or when only the server is on docker
		},
	},
});

import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	assetsInclude: "./static",
	plugins: [
		reactRefresh(),
		tsConfigPaths({
			extensions: [".js", ".jsx", ".ts", ".tsx", "json"],
		}),
	],
});

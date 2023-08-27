import * as path from "path";
import {defineConfig} from "vite";
import handlebars from "vite-plugin-handlebars-precompile.js";

export default defineConfig( {
	root: path.resolve(path.__dirname, "src"),
	build: {
		outDir: path.resolve(path.__dirname, "build")
	},
	server: {
		open: "index.html"
	},
	plugins: [handlebars()]

});

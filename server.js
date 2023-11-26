const path = require("path");
const fileURLToPath = require("url");
const express = require("express");


const app = express();
const PORT = 3000;

const currentDir = fileURLToPath(import.meta.url);
const __dirname = path.dirname(currentDir);

app.use(express.static(__dirname + "/build"));

app.get("*", function(_, res) {
	res.sendFile("/index.html", {
		root: __dirname + "/build"
	});
});

app.listen(PORT, function() {
	console.log(`My Web Messenger listening on port ${PORT}!`);
});

const {JSDOM} = require("jsdom");
import Handlebars from "handlebars";
import fs from "fs";

const {window} = new JSDOM("<div id='app'></div>", {
    url: "http://localhost:3000"
  });
  
  global.window = window;



console.log(require.extensions[".js"].toString());
console.log("=======");
require.extensions[".hbs"] = function(module, filename) {
    console.log("in .hbs");
    const contents = fs.readFileSync(filename, "utf-8");
    module.exports = Handlebars.compile(contents);
}

require.extensions[".scss"] = function() {
    module.exports = () => ({});
}

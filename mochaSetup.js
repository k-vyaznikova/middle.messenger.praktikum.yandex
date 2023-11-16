const {JSDOM} = require("jsdom");
//const {resolve} = require("path");
//require("module-alias/register");
console.log(process.env.NODE_PATH);
const {window} = new JSDOM("<div id='app'></div>", {
    url: "http://localhost:3000"
  });

  global.window = window;

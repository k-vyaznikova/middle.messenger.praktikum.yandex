const {JSDOM} = require("jsdom");
const moduleAlias = require("module-alias");

const {window} = new JSDOM("<div id='app'></div>", {
    url: "http://localhost:3000"
});
global.window = window;
console.log(global.window.history );
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
//window.history = window.document;

//moduleAlias.addAlias("/utils/routing/", __dirname + "/src/utils/routing/");

import {JSDOM} from "jsdom";

const {window} = new JSDOM("<div id='app'></div>", {
    url: "http://localhost:3000"
  });
  
  global.window = window;


/*
require.extensions['.hbs'] = function (module, filename) {
    const contents = fs.readFileSync(filename, "utf-8");
    module.exports = Handlebars.compile(contents);
}
*/
/*
require.extensions[".scss"] = function() {
    module.exports = () => ({});
}
*/

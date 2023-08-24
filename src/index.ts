import Handlebars from "handlebars";

import {Form} from "/components/form/script.ts";
import {SecondaryBtn} from "/components/secondary_btn/script.js";
import {registerComponent} from "/utils/register_component.ts";
import {Input} from "/components/input/script.js";
import {SubmitBtn} from "/components/submit_btn/script.ts";

import {renderPage} from "/utils/render_page.ts";


import cardpage from "/layouts/cardpage/cardpage.ts";
import leftside from "/layouts/chatpage/leftside/leftside.ts";
import rightside from "/layouts/chatpage/rightside/rightside.ts";
import defpage from "/layouts/defpage/defpage.ts";
import popup from "/layouts/popup/popup.ts";
import profpage from "/layouts/profpage/profpage.ts";


    registerComponent('Form', Form);
    registerComponent('SecondaryBtn', SecondaryBtn);
    registerComponent('Input', Input);
    registerComponent('SubmitBtn', SubmitBtn);


	// регистрация helpers
	Handlebars.registerHelper("cardpage", cardpage);
	Handlebars.registerHelper("leftpage", leftside);
	Handlebars.registerHelper("rigthpage", rightside);
	Handlebars.registerHelper("defpage", defpage);
	Handlebars.registerHelper("popup", popup);
	Handlebars.registerHelper("profpage", profpage);

window.addEventListener("DOMContentLoaded", () => {
    renderPage('auth');
});


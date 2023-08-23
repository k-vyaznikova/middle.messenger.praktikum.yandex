import Handlebars from "handlebars";
import {registerComponent} from "/utils/resgiter_component.js";
import {AuthPage} from "/pages/auth/script.ts";
import {Form} from "/components/form/script.ts";

import {Input} from "/components/input/script.ts";
import {SubmitBtn} from "/components/submit_btn/script.ts";
import {SecondaryBtn} from "./components/secondary_btn/script.js";

import cardpage from "/layouts/cardpage/cardpage.ts";
import leftside from "/layouts/chatpage/leftside/leftside.ts";
import rightside from "/layouts/chatpage/rightside/rightside.ts";
import defpage from "/layouts/defpage/defpage.ts";
import popup from "/layouts/popup/popup.ts";
import profpage from "/layouts/profpage/profpage.ts";


    registerComponent('Form', Form);
    //registerComponent('SecondaryBtn', SecondaryBtn);


	// регистрация helpers
	Handlebars.registerHelper("cardpage", cardpage);
	Handlebars.registerHelper("leftpage", leftside);
	Handlebars.registerHelper("rigthpage", rightside);
	Handlebars.registerHelper("defpage", defpage);
	Handlebars.registerHelper("popup", popup);
	Handlebars.registerHelper("profpage", profpage);
	// -------

window.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");


	const form = new Form({
        "title": "Вход"
	});
	const auth = new AuthPage({form: form});
	root.append(auth.getContent());
});


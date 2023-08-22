import Handlebars from "handlebars/runtime";
import {AuthPage} from "/pages/auth/script.ts";
import {Form} from "/components/form/script.ts";
import {Input} from "/components/input/script.ts";
import {SubmitBtn} from "/components/submit_btn/script.ts";
import {SecondaryBtn} from "./components/secondary_btn/script";

import cardpage from "/layouts/cardpage/cardpage.ts";
import leftside from "/layouts/chatpage/leftside/leftside.ts";
import rightside from "/layouts/chatpage/rightside/rightside.ts";
import defpage from "/layouts/defpage/defpage.ts";
import popup from "/layouts/popup/popup.ts";
import profpage from "/layouts/profpage/profpage.ts";


window.addEventListener("DOMContentLoaded", () => {
	// регистрация helpers
	Handlebars.registerHelper("cardpage", cardpage);
	Handlebars.registerHelper("leftpage", leftside);
	Handlebars.registerHelper("rigthpage", rightside);
	Handlebars.registerHelper("defpage", defpage);
	Handlebars.registerHelper("popup", popup);
	Handlebars.registerHelper("profpage", profpage);
	// -------


	const root = document.querySelector("#app");


	const form = new Form({
		"title": "Вход",
		"submit_url": "#",
		"input_1": new Input({
			name: "login",
			label: "Логин",
			id: "login_auth",
			type: "text",
			error: "Тестовая ошибка",
		}),
		"input_2": new Input({
			name: "password",
			label: "Пароль",
			id: "password_auth",
			type: "password",
			error: "Тестовая ошибка",
		}),
		"submit_btn": new SubmitBtn({
			text: "Войти",
		}),
		"secondary_btn": new SecondaryBtn({
			href: "#",
			text: "Зарегистироваться",
		}),
	});
	const auth = new AuthPage({"form": form});
	root.append(auth.getContent());
});


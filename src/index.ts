import Handlebars from "handlebars";
import addComponents from "/utils/add_components";


import cardpage from "/layouts/cardpage/cardpage.ts";
import leftside from "/layouts/chatpage/leftside/leftside.ts";
import rightside from "/layouts/chatpage/rightside/rightside.ts";
import defpage from "/layouts/defpage/defpage.ts";
import popup from "/layouts/popup/popup.ts";
import ifEq from "/utils/ifequal.ts";


// Добавление компонентов
addComponents();

// регистрация helpers
Handlebars.registerHelper("cardpage", cardpage);
Handlebars.registerHelper("leftside", leftside);
Handlebars.registerHelper("rightside", rightside);

Handlebars.registerHelper("defpage", defpage);
Handlebars.registerHelper("popup", popup);
Handlebars.registerHelper("ifEq", ifEq);


import Router from "/utils/routing/router.ts";
import {AuthPage} from "/pages/auth/script.ts";
import {RegisterPage} from "/pages/register/script.ts";
import {ChatPage} from "/pages/chat/script.ts";
// import {CommunityPage} from "/pages/community/script.ts";
import {ChatEditPage} from "./pages/chat-edit/script";
import {ErrorPage} from "/pages/error/script.ts";
import {PassEditPage} from "/pages/password-edit/script.ts";
import {ProfilePage} from "/pages/profile/script.ts";
import {ProfileEditPage} from "/pages/profile-edit/script.ts";

import AuthController from "/controllers/auth-controller.ts";
import ChatsController from "/controllers/chats-controller.ts";
import store from "/utils/store.ts";


enum Routes {
	Index = "/",
	Register = "/register",
	Profile = "/profile",
	Chat = "/chat",
	ChatEdit = "/chat-edit"
  }

window.addEventListener("DOMContentLoaded", async () => {
	Router
		.use(Routes.Index, AuthPage)
		.use(Routes.Register, RegisterPage)
		.use(Routes.Profile, ProfilePage)
		.use(Routes.Chat, ChatPage)
		.use(Routes.ChatEdit, ChatEditPage);

	let isProtectedPage: boolean = true;
	let isChatPage: boolean = false;

	switch (window.location.pathname) {
	case "/chat":
		isChatPage = true;
	case "/register":
		isProtectedPage = false;
		break;
	case "/auth":
		isProtectedPage = false;
		break;
	}

	if (isProtectedPage) {
		try {
			await AuthController.fetchUser();
			Router.start();
		} catch (e: any) {
			Router.go(Routes.Index);
		}
	} else {
		Router.go(window.location.pathname);
	}
});


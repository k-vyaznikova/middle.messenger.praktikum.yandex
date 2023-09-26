import Handlebars from "handlebars";


import cardpage from "/layouts/cardpage/cardpage.ts";
import leftside from "/layouts/chatpage/leftside/leftside.ts";
import rightside from "/layouts/chatpage/rightside/rightside.ts";
import defpage from "/layouts/defpage/defpage.ts";
import ifEq from "/utils/ifequal.ts";


// регистрация helpers
Handlebars.registerHelper("cardpage", cardpage);
Handlebars.registerHelper("leftside", leftside);
Handlebars.registerHelper("rightside", rightside);

Handlebars.registerHelper("defpage", defpage);
Handlebars.registerHelper("ifEq", ifEq);


import Router from "/utils/routing/router.ts";
import {AuthPage} from "/pages/auth/script.ts";
import {RegisterPage} from "/pages/register/script.ts";
import {ChatPage} from "/pages/chat/script.ts";
import {ChatEditPage} from "./pages/chat-edit/script";
import {PassEditPage} from "/pages/password-edit/script.ts";
import {ProfilePage} from "/pages/profile/script.ts";
import {ProfileEditPage} from "/pages/profile-edit/script.ts";
import AuthController from "/controllers/auth-controller";
import store from "/utils/store.ts";


enum Routes {
	Index = "/",
	Register = "/register",
	Profile = "/profile",
	Chat = "/chat",
	ChatEdit = "/chat-edit",
	PassEdit = "/pass-edit",
	ProfileEdit = "/profile-edit"
  }

window.addEventListener("DOMContentLoaded", async () => {
	Router
		.use(Routes.Index, AuthPage)
		.use(Routes.Register, RegisterPage)
		.use(Routes.Profile, ProfilePage)
		.use(Routes.Chat, ChatPage)
		.use(Routes.ChatEdit, ChatEditPage)
		.use(Routes.PassEdit, PassEditPage)
		.use(Routes.ProfileEdit, ProfileEditPage);

	let isProtectedPage: boolean = true;

	switch (window.location.pathname) {
	case Router.Register:
		isProtectedPage = false;
		break;
	case Routes.Index:
		isProtectedPage = false;
		break;
	}

	if (isProtectedPage) {
		console.log("защищ")
		try {
			await AuthController.fetchUser();
			Router.start();
		} catch (e: any) {
			Router.go(Routes.Index);
		}
	}
	else {
		console.log("не защищ");
		try {
			await AuthController.fetchUser();
			Router.go(Routes.Chat);
			console.log("не зaщищ  и зареган");
		} catch (e) {
			Router.go(window.location.pathname);
			console.log("не зaщищ  не зареган");
		}
	}
});


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
import {ChatProfilePage} from "/pages/chat-profile/script";
import store from "/utils/store";


enum Routes {
	Index = "/",
	Register = "/sign-up",
	Profile = "/profile",
	Chat = "/messenger",
	ChatEdit = "/chat-edit",
	PassEdit = "/pass-edit",
	ProfileEdit = "/settings",
	ChatProfile = "/chat-profile"
  }

window.addEventListener("DOMContentLoaded", async () => {
	Router
		.use(Routes.Index, AuthPage)
		.use(Routes.Register, RegisterPage)
		.use(Routes.Profile, ProfilePage)
		.use(Routes.Chat, ChatPage)
		.use(Routes.ChatEdit, ChatEditPage)
		.use(Routes.PassEdit, PassEditPage)
		.use(Routes.ProfileEdit, ProfileEditPage)
		.use(Routes.ChatProfile, ChatProfilePage);

	let isProtectedPage: boolean = true;

	switch (window.location.pathname) {
	case Routes.Register:
		isProtectedPage = false;
		break;
	case Routes.Index:
		isProtectedPage = false;
		break;
	}

	if (isProtectedPage) {
		try {
			await AuthController.fetchUser();
			if (store.getState().user.id > 0 )
				Router.start();
		} catch (e: any) {
			Router.start();
			Router.go(Routes.Index);
		}
	} else {
		try {
			await AuthController.fetchUser();
			if (store.getState().user.id > 0) {
				Router.start();
				Router.go(Routes.Chat);
			}
		} catch (e) {
			Router.start();
			Router.go(window.location.pathname);
		}
	}
});


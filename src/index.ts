import AuthPage from "./pages/auth";
import MessengerPage from "./pages/messenger";
import RegisterPage from "./pages/register";
import ChangePasswordPage from "./pages/change-password";
import ProfilePage from "./pages/profile";
import CreateChatPage from "./pages/create-chat";
import Router from "./utils/routing/router";
import RegisterHelper from "./layouts/register";
import  AuthController  from "./controllers/auth-controller";
import store from "./utils/store";
import ChatController from "./controllers/chats-controller";
import UserController from "./controllers/user-controller";



const routes: Record<string, any> = {
	auth: {
		path: "/",
		page: AuthPage
	},
	register: {
		path: "/register/",
		page: RegisterPage
	},
	messenger: {
		path: "/messenger/",
		page: MessengerPage
	},
	change_password: {
		path: "/change-password/",
		page: ChangePasswordPage
	},
	profile: {
		path: "/profile/",
		page: ProfilePage
	},
	create_chat: {
		path: "/create-chat/",
		page: CreateChatPage
	}
}
	


window.addEventListener("DOMContentLoaded", async () => {
	RegisterHelper();
	Object.values(routes).forEach((route: Record<string, any>) => {
		Router.use(route.path, route.page);
	})


	//to do: add isAuth
	try {
		let res = await AuthController.fetchUser();
		await ChatController.fetchChats();
		await UserController.fetchFullUserList();
		if(res === true && store.getState().user.id > 0){
			Router.start();
		}	
			
		else
			Router.go(routes.auth.path);
	} catch (e: any) {
		Router.go(routes.auth.path);
	}
	/*if (isAuth) {
		Router.go(routes.messenger.path);
	}	else {
		Router.go(routes.auth.path);
	}*/
});
/*
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
	Register = "/register",
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
			Router.go(Routes.Index);
		}
	} else {
		try {
			await AuthController.fetchUser();
			if (store.getState().user.id > 0)
				Router.go(Routes.Chat);
		} catch (e) {
			Router.go(window.location.pathname);
		}
	}
});
*/

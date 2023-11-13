import {Block} from "/utils/block.ts";
import {AuthPage} from "/pages/auth/script.ts";
import {RegisterPage} from "/pages/register/script.ts";
import {ChatPage} from "/pages/chat/script.ts";
import {CommunityPage} from "/pages/community/script.ts";
import {ChatEditPage} from "../pages/chat-edit/script";
import {ProfilePage} from "/pages/profile/script.ts";
import {ErrorPage} from "/pages/error/script.ts";
import {PassEditPage} from "/pages/password-edit/script.ts";
import {ProfileEditPage} from "/pages/profile-edit/script.ts";
import {MainPage} from "/pages/main/script.ts";

const PAGES: Record<string, typeof Block> = {
	"auth": AuthPage,
	"register": RegisterPage,
	"chat": ChatPage,
	"community": CommunityPage,
	"chat_edit": ChatEditPage,
	"profile": ProfilePage,
	"error": ErrorPage,
	"pass_edit": PassEditPage,
	"profile_edit": ProfileEditPage,
	"main": MainPage
};
export function renderPage(namePage: string ) {
	const root: HTMLElement | null = document.querySelector("#app");
	if (root) {
		root.innerHTML = "";
		const page = new PAGES[namePage]();
		root.append(page.getContent() as HTMLElement);
		page.dispatchComponentDidMount();
	}
}

import {Component} from "/pages/auth/Block.ts";
import {AuthPage} from "/pages/auth/script.ts";
import {RegisterPage} from "/pages/register/script.ts";
import {ChatPage} from "/pages/chat/script.ts";
import {CommunityPage} from "/pages/community/script.ts";
import {ErrorPage} from "/pages/error/script.ts";

const PAGES: {string: Component} = {
    "auth": AuthPage,
    "register": RegisterPage,
    "chat": ChatPage,
    "community": CommunityPage,
    "error": ErrorPage
};
export function renderPage(namePage: string ){
    console.log(namePage);
    const root = document.querySelector("#app");
    root.innerHTML = '';
	const page = new PAGES[namePage]();
	root.append(page.getContent());
    page.dispatchComponentDidMount();
}

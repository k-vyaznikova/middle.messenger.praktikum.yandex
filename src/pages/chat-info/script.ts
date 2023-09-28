import {Block} from "/utils/block.ts";
import template from "/pages/chat-edit/chat-edit.hbs";
import {ChatProfileEdit} from "/components/chat_profile_edit/script";
import {Link} from "/components/link/script";
import {getUrlParams} from "/utils/url_utils";
import authController from "/controllers/auth-controller";
import chatsController from "/controllers/chats-controller";


export class ChatProfilePage extends Block {
	constructor() {
		super();
	}

	init() {
		this.children.link = new Link({
			href: "/chat",
			name: "",
			class: "back-link"
		});
		this.children.chatProfile = new ChatProfile({});
		authController.fetchUser().then(() => {
			chatsController.fetchChats().then(() => {
				this.children.chatProfile.setProps({
					is_loaded: true
				});
			});
		});
	}


	render() {
		return this.compile(template, this.props);
	}
}


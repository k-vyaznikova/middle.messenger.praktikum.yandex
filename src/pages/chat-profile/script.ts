import {Block} from "/utils/block.ts";
import template from "/pages/chat-profile/chat-profile.hbs";
import {Link} from "/components/link/script";
import ChatsController from "/controllers/chats-controller";
import {getUrlParams} from "/utils/url_utils";
import {ChatProfile} from "/components/chat_profile/script";
import chatsController from "/controllers/chats-controller";

export class ChatProfilePage extends Block {
	constructor() {
		super();
	}

	async init() {
		this.children.link = new Link({
			href: "/messenger",
			name: "",
			class: "back-link",
			func_before: () => {
				chatsController.selectChat(0);
			}
		});

		const params: Record<string, string> = getUrlParams();
		const id: number = params["id"] as unknown as number;

		this.children.chatProfile = new ChatProfile({});
		if (id > 0) {
			ChatsController.fetchChatAndUser(id).then((response) => {
				this.children.chatProfile.setProps({
					is_loaded: true,
					error: response.is_ok? "" : response.msg_text
				});
			});
		}
	}


	render() {
		return this.compile(template, this.props);
	}
}


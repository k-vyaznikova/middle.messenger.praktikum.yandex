import {Block} from "/utils/block.ts";
import template from "/pages/chat-edit/chat-edit.hbs";
import {ChatProfileEdit} from "/components/chat_profile_edit/script";
import {Link} from "/components/link/script";
import {getUrlParams} from "/utils/url_utils";
import chatsController from "/controllers/chats-controller";
import ChatsController from "/controllers/chats-controller.ts";


export class ChatEditPage extends Block {
	constructor() {
		super();
	}

	init() {
		this.children.link = new Link({
			href: "/chat",
			name: "",
			class: "back-link",
			func_before: () => {
				chatsController.selectChat(0);
			}
		});

		const params: Record<string, string> = getUrlParams();
		const id: number = params["id"] as unknown as number;

		this.children.chatProfileEdit = new ChatProfileEdit({});
		if (id > 0) {
			ChatsController.fetchChatAndUser(id).then((response) => {
				this.children.chatProfileEdit.setProps({
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


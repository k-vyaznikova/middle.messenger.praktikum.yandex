import {Block} from "/utils/block.ts";
import template from "/pages/chat-profile/chat-profile.hbs";
import {Link} from "/components/link/script";
import ChatsController from "/controllers/chats-controller";
import {ChatProfile} from "/components/chat_profile/script";
import chatsController from "/controllers/chats-controller";


interface ChatEditPageProps {
	id: number
}
export class ChatProfilePage extends Block {
	constructor(props: ChatEditPageProps) {
		super(props);
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

		const id: number = this.props.id as unknown as number;

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


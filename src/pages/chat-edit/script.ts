import {Block} from "/utils/block.ts";
import template from "/pages/chat-edit/chat-edit.hbs";
import {ChatProfileEdit} from "/components/chat_profile_edit/script";
import {Link} from "/components/link/script";
import {getUrlParams} from "/utils/url_utils";
import authController from "/controllers/auth-controller";
import chatsController from "/controllers/chats-controller";


export class ChatEditPage extends Block {
	constructor() {
		super(/* {
			title: "Иван",
			submit_url: "#",
			edit_mode: "yes",
			ref: "form",
			profile_photo: {
				profilePhoto: img,
				profileAlt: "Иван"
			},
			profile_items: [
				{
					infoLabel: "Назване чата",
					editMode: "yes",
					infoType: "text",
					infoName: "name",
					value: "Соседи",
					validate_type: "not-empty",
					ref: "input_name"
				}
			],
			submit_btn: {
				text: "Создать чат"
			}
		}*/);
	}

	init() {
		console.log("in init chat edit");
		this.children.link = new Link({
			href: "/chat",
			name: "",
			class: "back-link"
		});
		this.children.chatProfileEdit = new ChatProfileEdit({});
		authController.fetchUser().then(() => {
			chatsController.fetchChats().then(() => {
				this.children.chatProfileEdit.setProps({
					is_loaded: true
				});
			});
		});
	}


	render() {
		return this.compile(template, this.props);
	}
}


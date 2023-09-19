import {Block} from "/utils/block.ts";
import template from "/pages/chat/chat.hbs";
import chatImg from "/img/noimgprofile.svg";
import img from "/img/photo.jpg";
import store from "/utils/store.ts";
import chatsController from "/controllers/chats-controller.ts";
import authController from "/controllers/auth-controller";
import {Dialog} from "/components/dialog/script.ts";
import {ContactList} from "/components/contact_list/script.ts";
import {ProfilePersonalLink} from "/components/profile_personal_link/script.ts";
import {Link} from "/components/link/script.ts";
import {withStore} from "/utils/store.ts";

interface ChatPageProps {
	contact_list: Array<any>,
	is_loaded?: string,
	chat_info: {
		chatName: string,
		chatImg: string,
		personalChat: string
	},
	dialog: Array<any>,
	send_msg_form: {
		ref: string,
		send_msg_text: {
			name: string,
			ref: string,
			validate_type: string,
			value: string,
		},
		send_msg_file: {
			name: string,
			ref: string,
			value: string,
		}
	}
}

export class ChatPageInitial extends Block {
	constructor(props: ChatPageProps) {
		super({
			...props,
			chat_info: {
				chatName: "Вадим",
				chatImg: chatImg,
				personalChat: "yes"
			},
			contact_list: [],
			dialog: [],
			send_msg_form: {
				ref: "send_message_form",
				send_msg_text: {
					name: "send_message_text",
					ref: "send_message_text",
					validate_type: "not-empty",
					value: ""
				},
				send_msg_file: {
					name: "send_message_file",
					ref: "send_message_file",
					value: ""
				}
			}

		});
	}
	init() {
		this.children.profilePersonalLink = new ProfilePersonalLink({});
		this.children.linkEditChat = new Link({
			href: "/chat-edit",
			class: "chat-add"
		});
		this.children.contactList = new ContactList({});
		this.children.dialog = new Dialog({});
		authController.fetchUser().finally(() => {
			this.children.profilePersonalLink.setProps({
				profile_img: "/img/noimgprofile.svg",
				profile_name: this.props.first_name + " " + this.props.second_name
			});
			chatsController.fetchChats().finally(() => {
				this.children.contactList.setProps({
					is_loaded: "yes"
				});
			});
		});
	}

	

	async searchChat(title: string) {
		const state: any = store.getState();
		const newChatList: Array<any> = state["chats"].filter(function(item) {
			return item["title"].indexOf(title) >= 0;
		});
		return newChatList;
	}

	render() {
		return this.compile(template, this.props);
	}
}

const withUser = withStore((state) => ({...state.user}));
export const ChatPage = withUser(ChatPageInitial);


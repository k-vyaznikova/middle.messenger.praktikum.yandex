import {Block} from "/utils/block.ts";
import template from "/pages/chat/chat.hbs";
import chatImg from "/img/noimgprofile.svg";
import store from "/utils/store.ts";
import chatsController from "/controllers/chats-controller.ts";
import authController from "/controllers/auth-controller";
import {Dialog} from "/components/dialog/script.ts";
import {ContactList} from "/components/contact_list/script.ts";
import {ProfilePersonalLink} from "/components/profile_personal_link/script.ts";
import {withStore} from "/utils/store.ts";
import {BASE_FILE_URL} from "/utils/constants";
import Popup from "/layouts/popup/popup";
import {AddChat} from "/components/add_chat/script";
import {PopupOpen} from "/components/popup_open/script";

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
		this.children.profilePersonalLink = new ProfilePersonalLink({
			profile_img: "/img/noimgprofile.svg",
			profile_name: "",
			href: "/profile"
		});
		this.children.popupCreateChat = new Popup({
			classVisibility: "invisible",
			content: new AddChat({
				error: "",
				funcClosePopup: () => {
					this.children.popupCreateChat.setProps({
						classVisibility: "invisible"
					});
				}
			}),
			events: {
				close: () => {
					this.children.popupCreateChat.setProps({
						classVisibility: "invisible"
					});
				}
			}
		});
		this.children.popupOpen = new PopupOpen({
			class: "chat-add",
			href: "#",
			onClick: () => {
				this.children.popupCreateChat.setProps({
					classVisibility: "visible"
				});
			}
		});


		this.children.contactList = new ContactList({});
		this.children.dialog = new Dialog({});
		authController.fetchUser().then(() => {
			this.children.profilePersonalLink.setProps({
				profile_img: this.props.avatar? BASE_FILE_URL+this.props.avatar : "/img/noimgprofile.svg",
				profile_name: this.props.first_name + " " + this.props.second_name,
				href: "/profile"
			});
			chatsController.fetchChats().then(() => {
				this.children.contactList.setProps({
					is_loaded: "yes"
				});
			});
		});
	}


	async searchChat(title: string) {
		const state: any = store.getState();
		const newChatList: Array<any> = state["chats"].filter(function(item: Record<string, any>) {
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


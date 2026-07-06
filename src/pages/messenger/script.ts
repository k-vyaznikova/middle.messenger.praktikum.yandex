import {Block} from "../../utils/block/block";
import template from "./template.hbs";
import style from "./style.module.scss";
import Chats from "../../components/chats";
import Messenger from "../../components/messenger";
import Button from "../../components/button";
import AuthController from "/controllers/auth-controller.ts";


export class MessengerPage extends Block {
	constructor(props: Record<string, any>) {
		super({...props, style});
		
		//this.children.dialog = new Messenger({});
	}

	init() {
		this.children.chats = new Chats({});
		this.children.button_logout = new Button({
			text: "Выйти",
			onClick: () => {
				AuthController.logout();
			}
		});
	}

	render() {

		return this.compile(template, this.props);
	}
}

/*
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
		super(props);
	}
	init() {
		this.children.profilePersonalLink = new ProfilePersonalLink({
			profile_img: img,
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
				profile_img: this.props.avatar? BASE_FILE_URL+this.props.avatar : img,
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

*/
import {Block} from "/utils/block.ts";
import template from "/components/chat_info/template.hbs";
import {Link} from "/components/link/script";
import {PopupOpen} from "/components/popup_open/script";
import {DeleteChat} from "/components/delete_chat/script";
import Popup from "/layouts/popup/popup";

interface ChatInfoProps{
	chatImg: string,
	chatName: string,
	chatId: string
}

export class ChatInfo extends Block {
	constructor(props: ChatInfoProps) {
		super(props);
	}
	init() {
		if (this.props.chatId as number > 0) {
			this.children.popupDeleteChat = new Popup({
				classVisibility: "invisible",
				content: new DeleteChat({
					chat_id: (this.props.chatId as string),
					title: (this.props.chatName as string),
					error: "",
					funcClosePopup: () => {
						this.children.popupDeleteChat.setProps({
							classVisibility: "invisible"
						});
					}
				}),
				events: {
					close: () => {
						this.children.popupDeleteChat.setProps({
							classVisibility: "invisible"
						});
					}
				}
			});


			this.children.link_delete = new PopupOpen({
				href: "#",
				class: "delete",
				onClick: () => {
					this.children.popupDeleteChat.setProps({
						classVisibility: "visible"
					});
				},
				name: ""
			});
			this.children.link_edit = new Link({
				href: "/chat-edit?id="+this.props.chatId,
				class: "edit",
				ref: "link_edit",
				name: ""
			});
			this.children.link_info = new Link({
				href: "/chat-info?id="+this.props.chatId,
				class: "info",
				ref: "link_info",
				name: ""
			});
		}
	}
	render() {
		return this.compile(template, this.props);
	}
}



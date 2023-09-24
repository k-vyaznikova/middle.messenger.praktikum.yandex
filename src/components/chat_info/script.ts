import {Block} from "/utils/block.ts";
import template from "/components/chat_info/template.hbs";
import {Link} from "/components/link/script"

interface ChatInfoProps{
	chatImg: string,
	chatName: string,
}

export class ChatInfo extends Block {
	constructor(props: ChatInfoProps) {
		super(props);
	}
	init(){
		this.children.link_delete = new Link({
			href: "/delete-chat",
			class: "delete",
			ref: "link_delete",
			name:""
		});
		this.children.link_edit = new Link({
			href: "/chat-edit",
			class: "edit",
			ref: "link_edit",
			name:""
		});
		this.children.link_info = new Link({
			href: "/chat-info",
			class: "info",
			ref: "link_info",
			name:""
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}



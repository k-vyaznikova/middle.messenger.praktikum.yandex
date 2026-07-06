import {Block} from "../../utils/block/block";
import styles from "./style.module.scss";
import template from "./template.hbs";
import ChatItem from "../chat-item";


/*
import ChatsController from "/controllers/chats-controller.ts";
import {ContactItem, ContactItemProps} from "/components/contact_item/script.ts";
import {formattedTime} from "/utils/date_utils.ts";*/

interface ChatsProps{
	isLoaded: boolean,
	contacts: Array<any>
}


export class ChatsInitial extends Block {
	constructor(props: ChatsProps) {
		super({...props, styles});
	}

	
	init() {
		this.children.chats = ((this.props.chats as Array<any>).map((chat: any) => {
			return new ChatItem(chat);
		})) as any;
	}
	render() {
		return this.compile(template, this.props);
	}
}




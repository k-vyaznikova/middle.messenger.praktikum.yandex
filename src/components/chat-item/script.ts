import {Block} from "../../utils/block/block";
import styles from "./style.module.scss";
import template from "./template.hbs";
import {BASE_FILE_URL} from "/utils/constants.ts";


/*
import ChatsController from "/controllers/chats-controller.ts";
import {ContactItem, ContactItemProps} from "/components/contact_item/script.ts";
import {formattedTime} from "/utils/date_utils.ts";*/

interface ChatItemProps{
	title: string,
	avatar?: string,
	avatar_src?: string,
	content?: string,
	time?: string,
	unread_count?: number,
	is_selected?: boolean,
	onClick?: () => void,
}


export class ChatItem extends Block {
	constructor(props: ChatItemProps) {
		super({...props, styles});
	}

	
	init() {

		//console.log(this.props);
			if(this.props.avatar){
				this.setProps({avatar_src: BASE_FILE_URL + this.props.avatar});
			} else {
				this.setProps({avatar: this.props.title.charAt(0)});
			}
			if(this.props.unread_count === 0){
				this.setProps({unread_count: "9"});
			}
			if(!this.props.content){
				this.setProps({content: "в чате пока нет сообщений"});
			}
		
	}
	render() {
		return this.compile(template, this.props);
	}
}




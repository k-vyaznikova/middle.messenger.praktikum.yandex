import {Block} from "/utils/block.ts";
import template from "/components/chat_info/template.hbs";

interface ChatInfoProps{
	chatImg: string,
	chatName: string,
}

export class ChatInfo extends Block {
	constructor(props: ChatInfoProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
	/* componentDidMount(){
		console.log("123213");
		return true;
	}*/
}



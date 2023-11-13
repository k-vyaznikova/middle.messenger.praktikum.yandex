import {Block} from "/utils/block.ts";
import template from "/components/incoming_msg/template.hbs";
import {User} from "/types/common_types";


interface IncomingMsgProps{
	msgText: string,
	msgTime: string,
	msgImg?: string,
	user: User
}

export class IncomingMsg extends Block {
	constructor(props: IncomingMsgProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}

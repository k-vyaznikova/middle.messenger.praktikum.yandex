import {Block} from "/utils/block.ts";
import template from "/components/outgoing_msg/template.hbs";


interface OutgoingMsgProps{
	msgImg?: string,
	msgText: string,
	msgStatus?: string,
	msgTime: string
}

export class OutgoingMsg extends Block {
	constructor(props: OutgoingMsgProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}

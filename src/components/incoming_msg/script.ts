import {Block} from "/utils/block.ts";
import template from "/components/incoming_msg/template.hbs";

interface IncomingMsgProps{
	msgText: string,
	msgTime: string,
	msgImg?: string
}

export class IncomingMsg extends Block {
	constructor(props: IncomingMsgProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}

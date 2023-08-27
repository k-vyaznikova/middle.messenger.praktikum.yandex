import {Block} from "/utils/block.ts";
import template from "/components/send_msg_form/template.hbs";

interface SendMsgFormProps{
}

export class SendMsgForm extends Block {
	constructor(props: SendMsgFormProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}

import {Block} from "/utils/block.ts";
import template from "/components/send_msg_text/template.hbs";

interface SendMsgTextProps{
	name: string,
	ref: string,
	value: string,
	validate_type: string
	onKeyup: () => void,
	events:{
		keyup: () => void
	}
}

export class SendMsgText extends Block {
	constructor(props: SendMsgTextProps) {
		super({
			...props,
			events: {
				keyup: () => {
					props.onKeyup();
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}

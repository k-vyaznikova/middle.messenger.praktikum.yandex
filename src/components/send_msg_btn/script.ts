import {Block} from "/utils/block.ts";
import template from "/components/send_msg_btn/template.hbs";

interface SendMsgBtnProps{
	onClick: (event: Event) => void,
	events:{
		click: (event: Event) => void
	}
}

export class SendMsgBtn extends Block {
	constructor(props: SendMsgBtnProps) {
		console.log(props);
		super({
			...props,
			events: {
				click: (event: Event) => {
					console.log(213223);
					console.log(event);
					props.onClick(event);
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}

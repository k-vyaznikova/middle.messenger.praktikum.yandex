import {Block} from "/utils/block.ts";
import template from "/components/send_msg_btn/template.hbs";

interface SendMsgBtnProps{
	onClick?: (event: Event) => void,
	events?:{
		click: (event: Event) => void
	}
}

export class SendMsgBtn extends Block {
	constructor(props: SendMsgBtnProps) {
		super({
			...props,
			events: {
				click: (event: Event) => {
					event.preventDefault();
					(props.onClick as (event:Event)=>void)(event);
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}

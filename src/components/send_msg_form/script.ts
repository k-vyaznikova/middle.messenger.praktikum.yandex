import {Block} from "/utils/block.ts";
import template from "/components/send_msg_form/template.hbs";

interface SendMsgFormProps{
	onKeyup?: ()=>void,
	events?:{
		keyup: () => void
	}
}

export class SendMsgForm extends Block {
	constructor(props: SendMsgFormProps) {
		super({
			...props,
			events: {
				keyup: () => {
					const textarea: HTMLElement = this.getContent()?.querySelector("textarea") as HTMLElement;
					if (textarea.scrollHeight < 200)
						textarea.style.height = textarea.scrollHeight + "px";
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}

import {Block} from "/utils/block.ts";
import template from "/components/send_msg_text/template.hbs";

interface SendMsgTextProps{
	name: string,
	ref: string,
	value: string,
	validate_type: string,
	comparison_value?: string,
	related_field?: string,
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

	getValue() {
		return this.element?.querySelector("textarea#send-msg")?.value;
	}

	setValue(value: string) {
		(this.element as HTMLElement).getElementsByTagName("textarea")[0].value = value;
	}
	render() {
		return this.compile(template, this.props);
	}
}

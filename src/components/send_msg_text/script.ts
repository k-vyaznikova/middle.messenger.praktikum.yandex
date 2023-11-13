import {Block} from "/utils/block.ts";
import template from "/components/send_msg_text/template.hbs";

interface SendMsgTextProps{
	validate_type: string,
	comparison_value?: string,
	events:{
		keyup: (event: Event) => void
	}
}

export class SendMsgText extends Block {
	constructor(props: SendMsgTextProps) {
		super(props);
	}

	getValue() {
		return (this.element?.querySelector("textarea#send-msg") as HTMLTextAreaElement).value;
	}

	getValidateType() {
		return this.props.validate_type;
	}

	setValue(value: string) {
		(this.element as HTMLElement).getElementsByTagName("textarea")[0].value = value;
	}
	render() {
		return this.compile(template, this.props);
	}
}

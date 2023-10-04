import {Block} from "/utils/block.ts";
import template from "/components/send_msg_file/template.hbs";

interface SendMsgFileProps{
	name?: string,
	value?: string,
	validate_type?: string,
	events?:{
		click: (event: Event) => void
	}
}

export class SendMsgFile extends Block {
	constructor(props: SendMsgFileProps) {
		super({
			...props,
			events: {
				click: (event: Event) => {
					event.preventDefault();
					if ((event.target as HTMLElement).classList.contains("attach-btn")) {
						if (!this.props.attachChooseOpen)
							this.setProps({
								attachChooseOpen: "yes"
							});
						else
							this.setProps({
								attachChooseOpen: ""
							});
					}
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}

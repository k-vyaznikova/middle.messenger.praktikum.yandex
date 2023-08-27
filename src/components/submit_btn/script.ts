import {Block} from "/utils/block.ts";
import template from "/components/submit_btn/template.hbs";

interface SubmitBtnProps{
	text: string,
	onClick: (event: Event) => void,
	events:{
		click: (event: Event) => void
	}
}

export class SubmitBtn extends Block {
	constructor(props: SubmitBtnProps) {
		super({...props,
			events: {
				click: (event: Event) => {
					props.onClick(event);
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}



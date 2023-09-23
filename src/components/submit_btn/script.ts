import {Block} from "/utils/block.ts";
import template from "/components/submit_btn/template.hbs";
import {SubmitBtnProps} from "/types/common_types.ts";


export class SubmitBtn extends Block {
	constructor(props: SubmitBtnProps) {
		super({...props,
			events: {
				click: (event: Event) => {
					event.preventDefault();
					props.onClick(event);
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}



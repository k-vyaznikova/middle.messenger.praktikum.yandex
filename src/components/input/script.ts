import {Block} from "/utils/block.ts";
import template from "/components/input/template.hbs";

interface InputProps{
	id: string,
	label: string,
	name: string,
	type: string,
	ref: string,
	validate_type: string,
	not_empty?: string,
	onFocusout?: ()=>void,
	onKeyup?: ()=>void,
	events?:{
		focusout: () => void,
		keyup: () => void
	}
}

export class Input extends Block {
	constructor(props: InputProps) {
		super({
			...props,
			events: {
				focusout: () => {
					if (props.onFocusout) props.onFocusout();
				},
				keyup: () => {
					if (props.onKeyup) props.onKeyup();
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}



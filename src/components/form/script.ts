import {Block} from "/utils/block.ts";
import template from "/components/form/template.hbs";

interface FormProps{
	url_submit: string,
	title: string,
	inputs: Array<Object>,
	submit_btn: {
		text: string,
		onClick?: () => void,
		events: {
			click: () => void
		}
	},
	secondary_btn:{
		text: string,
		href: string,
		ref?: string,
		class?: string,
		onClick?: () => void,
		events: {
			click: () => void
		}
	}
}
export class Form extends Block {
	constructor(props: FormProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}



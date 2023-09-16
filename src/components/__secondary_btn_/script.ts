import {Block} from "/utils/block.ts";
import template from "/components/secondary_btn/template.hbs";

interface SecondaryBtnProps{
	href: String,
	text: String
}
export class SecondaryBtn extends Block {
	constructor(props: SecondaryBtnProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}



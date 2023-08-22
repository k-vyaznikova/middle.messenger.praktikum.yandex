import {Block} from "/utils/block.ts";
import template from "/components/secondary_btn/template.hbs";

interface SecondaryBtnProps {
    __href: String,
    __class: String,
    textLink: String
}

export class SecondaryBtn extends Block {
	constructor(props: SecondaryBtnProps) {
		super(props);
	}
	render() {
		return this.compile(template, {href: this.props.href, class: this.props.class, textLink: this.props.textLink});
	}
}



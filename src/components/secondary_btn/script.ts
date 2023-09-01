import {Block} from "/utils/block.ts";
import template from "/components/secondary_btn/template.hbs";

interface SecondaryBtnProps{
	href: String,
	text: String,
	onClick: () => void
}
export class SecondaryBtn extends Block {
	constructor(props: SecondaryBtnProps) {
		super({
			...props,
			events: {
				click: () => {
					props.onClick();
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}



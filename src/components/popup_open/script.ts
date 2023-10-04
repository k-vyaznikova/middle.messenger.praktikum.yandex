import {Block} from "/utils/block.ts";
import template from "/components/popup_open/template.hbs";

interface PopupOpenProps{
	class?: string,
	name?: string,
	href?: string,
	onClick: () => void,
	events?: {
		click: (event: Event) => void
	}
}

export class PopupOpen extends Block {
	constructor(props: PopupOpenProps) {
		super({
			...props,
			events: {
				click: (event: Event) => {
					event.preventDefault();
					(this.props.onClick as ()=>void)();
				}
			}
		});
	}


	render() {
		return this.compile(template, this.props);
	}
}



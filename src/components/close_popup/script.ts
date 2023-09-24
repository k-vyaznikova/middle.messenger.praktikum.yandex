import {Block} from "/utils/block.ts";
import template from "/components/close_popup/template.hbs";

interface ClosePopupProps{
	events?:{
		click: (event: Event) => void
	}
}

export class ClosePopup extends Block {
	constructor(props: ClosePopupProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}

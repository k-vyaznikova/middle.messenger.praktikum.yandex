import {Block} from "/utils/block.ts";
import template from "/components/back_link/template.hbs";
import {renderPage} from "/utils/render_page";

interface BackLinkProps{
	events: {
		click: (event: Event) => void
	}
}

export class BackLink extends Block {
	constructor(props: BackLinkProps) {
		super({
			...props,
			events:{
				click: (event: Event) => {
					event.preventDefault();
					renderPage("chat");
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}



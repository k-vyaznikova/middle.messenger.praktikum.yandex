import {Block} from "/utils/block.ts";
import template from "/components/link/template.hbs";
import {renderPage} from "/utils/render_page";

interface LinkProps{
	"name": string,
	"render": string,
	events: {
		click: (event: Event) => void
	}
}

export class Link extends Block {
	constructor(props: LinkProps) {
		super({
			...props,
			events: {
				click: (event: Event) => {
					event.preventDefault();
					renderPage(props.render);
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}



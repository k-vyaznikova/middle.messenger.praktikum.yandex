import {Block} from "/utils/block.ts";
import template from "/components/error/template.hbs";
import {Link} from "/components/link/script.ts";

interface ErrorProps{
	code: string,
	error_message: string,
	back_href: string
}

export class Error extends Block {
	constructor(props: ErrorProps) {
		super(props);
	}

	init() {
		this.children.link = new Link({
			href: this.props["back_href"] as string,
			class: this.props["error-link"] as string,
			name: "Назад к чатам"
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}



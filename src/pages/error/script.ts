import {Block} from "/utils/block.ts";
import template from "/pages/error/error.hbs";
import {Link} from "/components/link/script";


export class ErrorPage extends Block {
	constructor() {
		super({
			code: "404",
			error_message: "Такой страницы нет",
			back_href: "/messenger"
		});
	}


	init() {
		this.children.link = new Link({
			href: this.props["back_href"] as string,
			class: "error-link",
			name: "Назад к чатам"
		});
	}

	render() {
		return this.compile(template, this.props);
	}
}

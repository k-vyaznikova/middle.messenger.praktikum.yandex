import {Block} from "/utils/block.ts";
import template from "/pages/error/error.hbs";
import {Link} from "/components/link/script";


interface ErrorPageProps {
	code?: string,
	error_message?: string,
	back_href?: string
}
export class ErrorPage extends Block {
	constructor(props: ErrorPageProps) {
		super({
			code: "404",
			error_message: "Такой страницы нет",
			back_href: "/chat"
		});
	}


	init() {
		this.children.link = new Link({
			href: this.props["back_href"],
			class: "error-link",
			name: "Назад к чатам"
		});
	}

	render() {
		return this.compile(template, this.props);
	}
}

import Block from "/utils/block";
import template from "./template.hbs";
import Link from "/components/link";


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
		return true;
	}

	render() {
		return this.compile(template, this.props);
	}
}

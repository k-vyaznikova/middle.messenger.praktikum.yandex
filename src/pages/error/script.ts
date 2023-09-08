import {Block} from "/utils/block.ts";
import template from "/pages/error/error.hbs";

export class ErrorPage extends Block {
	constructor() {
		super({
			code: 404,
			error_message: "Такой страницы не существует",
			back_href: "/chats"
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}

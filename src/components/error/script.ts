import {Block} from "/utils/block.ts";
import template from "/components/error/template.hbs";

interface ErrorProps{
	code: string,
	error_message: string
}

export class Error extends Block {
	constructor(props: ErrorProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}



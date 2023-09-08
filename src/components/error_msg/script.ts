import {Block} from "/utils/block.ts";
import template from "/components/input/template.hbs";
import {checkError} from "/utils/validate.ts";

interface ErrorMsgProps{
	text: string,
	error: string
}

export class ErrorMsg extends Block {
	constructor(props: ErrorMsgProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}



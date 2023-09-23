import {Block} from "/utils/block.ts";
import template from "/components/error_msg/template.hbs";
import {ErrorMsgProps} from "/types/common_types.ts"


export class ErrorMsg extends Block {
	constructor(props: ErrorMsgProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}



import {Block} from "/utils/block.ts";
import template from "/components/dialog/template.hbs";


interface DialogProps{
	dialog?: Array<Object>
}
export class Dialog extends Block {
	constructor(props: DialogProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}

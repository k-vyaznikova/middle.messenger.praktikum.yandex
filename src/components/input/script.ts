import {Block} from "/utils/block.ts";
import template from "/components/input/template.hbs";

export class Input extends Block {
	constructor(props: Object) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}



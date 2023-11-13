import {Block} from "/utils/block.ts";
import template from "/layouts/inner/template.hbs";

export class InnerLayout extends Block {
	render() {
		return this.compile(template, this.props);
	}
}


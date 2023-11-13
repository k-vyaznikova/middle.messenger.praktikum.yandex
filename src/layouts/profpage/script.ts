import {Block} from "/utils/block.ts";
import template from "/layouts/profpage/template.hbs";

export class ProfPageLayout extends Block {
	render() {
		return this.compile(template, this.props);
	}
}


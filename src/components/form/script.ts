import {Block} from "/utils/block.ts";
import template from "../form/template.hbs";
import {SecondaryBtn} from "../secondary_btn/script";

export class Form extends Block {
	constructor(props: Object) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}



import {Block} from "/utils/block.ts";
import template from "/pages/main/main.hbs";


export class MainPage extends Block {
	constructor() {
		super();
	}

	render() {
		return this.compile(template, this.props);
	}
}

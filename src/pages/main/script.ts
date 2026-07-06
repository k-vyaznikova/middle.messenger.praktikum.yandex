import Block from "../../utils/block";
import template from "./template.hbs";


export class MainPage extends Block {
	constructor(params: Record<string, string>) {
		super(params);
		console.log(params);
	}

	render() {
		console.log(template);
		return this.compile(template, this.props);
	}
}

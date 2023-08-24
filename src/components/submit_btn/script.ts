import {Block} from "/utils/block.ts";
import template from "/components/submit_btn/template.hbs";



export class SubmitBtn extends Block {
	constructor(props: Object) {
		super(props);
	}
	render(){
		return this.compile(template, this.props);
	}
}



import {Block} from "/utils/block.ts";
import template from "/components/date_msg/template.hbs";


interface DateMsgProps{
	date: string
}
export class DateMsg extends Block {
	constructor(props: DateMsgProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}



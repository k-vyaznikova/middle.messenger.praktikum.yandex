import {Block} from "/utils/block.ts";
import template from "/components/member_list/template.hbs";

interface MemberListProps{
	member_list: Array<Object>
}

export class MemberList extends Block {
	constructor(props: MemberListProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}

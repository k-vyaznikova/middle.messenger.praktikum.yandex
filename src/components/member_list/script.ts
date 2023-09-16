import {Block} from "/utils/block.ts";
import template from "/components/member_list/template.hbs";

interface MemberListProps{
	member_list: Array<Object>,
	alt_message?: string
}

export class MemberList extends Block {
	constructor(props: MemberListProps) {
		super(props);
	}

	protected init(): void {
		// if(props["member_list"].length <= 0)
	}
	render() {
		return this.compile(template, this.props);
	}
}

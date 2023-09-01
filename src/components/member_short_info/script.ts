import {Block} from "/utils/block.ts";
import template from "/components/member_short_info/template.hbs";

interface MemberShortInfoProps{
	memberLink: string,
	memberPhoto: string,
	memberLogin: string,
	memberName: string,
	memberAdd?: string
}

export class MemberShortInfo extends Block {
	constructor(props: MemberShortInfoProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}

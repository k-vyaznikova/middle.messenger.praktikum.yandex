import {Block} from "/utils/block.ts";
import template from "/components/member_short_info/template.hbs";

interface MemberShortInfoProps{
	id: number,
	memberLink: string,
	memberPhoto: string,
	memberLogin: string,
	memberName: string,
	memberAdd?: string,
	hiddenInput?: string,
	onClick: (event: Event)=>void,
	events: {
		click: () => void
	}
}

export class MemberShortInfo extends Block {
	constructor(props: MemberShortInfoProps) {
		super({
			...props,
			events: {
				click: function(event: Event) {
					event.preventDefault();
					props.onClick(event);
				}
			}

		});
	}
	render() {
		return this.compile(template, this.props);
	}
}

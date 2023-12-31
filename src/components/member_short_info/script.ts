import {Block} from "/utils/block.ts";
import template from "/components/member_short_info/template.hbs";

interface MemberShortInfoProps{
	id: number,
	memberPhoto: string,
	memberLogin: string,
	memberName: string,
	memberAdd?: string,
	memberDelete?: string,
	hiddenInput?: string,
	onClick?: (event: Event)=>void | undefined,
	events?: {
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
					if (props.onClick)
						props.onClick(event);
				}
			}

		});
	}
	render() {
		return this.compile(template, this.props);
	}
}

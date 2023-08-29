import {Block} from "/utils/block.ts";
import template from "/components/community_add_link/template.hbs";
import {renderPage} from "/utils/render_page";

interface CommunityAddLinkProps{
	profile_img: string,
	profile_name: string,
	events: {
		click: (event: Event) => void
	}
}

export class CommunityAddLink extends Block {
	constructor(props: CommunityAddLinkProps) {
		super({
			...props,
			events: {
				click: (event: Event) => {
					event.preventDefault();
					renderPage("community_edit");
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}

import {Block} from "/utils/block.ts";
import template from "/components/profile_personal_link/template.hbs";
import {renderPage} from "/utils/render_page";

interface ProfilePersonalLinkProps{
	profile_img: string,
	profile_name: string,
	events: {
		click: (event: Event) => void
	}
}

export class ProfilePersonalLink extends Block {
	constructor(props: ProfilePersonalLinkProps) {
		super({
			...props,
			events: {
				click: (event: Event) => {
					event.preventDefault();
					renderPage("profile");
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}

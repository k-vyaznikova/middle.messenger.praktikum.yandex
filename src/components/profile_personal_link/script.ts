import {Block} from "/utils/block.ts";
import template from "/components/profile_personal_link/template.hbs";
import router, {Router} from "/utils/routing/router.ts";

interface ProfilePersonalLinkProps{
	profile_img: string,
	profile_name: string,
	href: string,
	events: {
		click: (event: Event) => void
	}
}

export class ProfilePersonalLink extends Block {
	private router: Router = router;
	constructor(props: ProfilePersonalLinkProps) {
		super({...props,
			events: {
				click: (event: Event) => {
					event.preventDefault();
					this.navigate();
				}
			}
		});
	}

	navigate() {
		this.router.go(this.props.href);
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		return true;
	}
	render() {
		return this.compile(template, this.props);
	}
}

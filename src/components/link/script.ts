import {Block} from "/utils/block.ts";
import template from "/components/link/template.hbs";
import router, {Router} from "/utils/routing/router.ts";
import {LinkProps} from "/types/common_types";

export class Link extends Block {
	private router: Router = router;
	constructor(props: LinkProps) {
		super({
			...props,
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

	render() {
		return this.compile(template, this.props);
	}
}



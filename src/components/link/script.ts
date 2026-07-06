import {Block} from "../../utils/block/block";
import template from "/components/link/template.hbs";
import router, {Router} from "/utils/routing/router.ts";



interface LinkProps{
	href: string,
	text: string,
	beforeNavigate?: () => void,
}
export class Link extends Block {
	private router: Router = router;
	constructor(props: LinkProps) {
		super({
			...props,
			events: {
				click: (event: Event) => {
					event.preventDefault();
					if (this.props.beforeNavigate)
						(this.props?.beforeNavigate as ()=>void)();
					this.navigate();
				}
			}
		});
	}

	navigate() {
		this.router.go(this.props.href as string);
	}

	render() {
		return this.compile(template, this.props);
	}
}



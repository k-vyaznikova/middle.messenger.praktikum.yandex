import {Block} from "./../../utils/block.ts";
import template from "./template.hbs";
import router, {Router} from "./../../utils/routing/router.ts";
import {LinkProps} from "/types/common_types";
import {getUrlParams} from "/utils/url_utils";

export class Link extends Block {
	private router: Router = router;
	constructor(props: LinkProps) {
		super({
			...props,
			events: {
				click: (event: Event) => {
					event.preventDefault();
					if (this.props.func_before)
						(this.props?.func_before as ()=>void)();
					this.navigate();
				}
			}
		});
	}

	navigate() {
		let pathname: string = this.props.href as string;
		let params = "";
		if (pathname.indexOf("?") > -1) {
			const arrayAddr: Array<string> = pathname.split("?");
			pathname = arrayAddr[0];
			if (arrayAddr.length > 1)
				params = arrayAddr[1];
		}
		this.router.go(pathname, params);
	}

	render() {
		return this.compile(template, this.props);
	}
}



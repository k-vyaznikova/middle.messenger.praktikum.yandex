import {Block} from "/utils/block.ts";
import template from "/components/logout_btn/template.hbs";
import AuthController from "/controllers/auth-controller";

interface LogoutBtnProps{
	text: String,
	events: Record<string, (event: Event)=>void>
}
export class LogoutBtn extends Block {
	constructor(props: LogoutBtnProps) {
		super({
			...props,
			events: {
				click: (event: Event) => {
					event.preventDefault();
					AuthController.logout();
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}



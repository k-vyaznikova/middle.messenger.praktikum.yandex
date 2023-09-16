import {Block} from "/utils/block.ts";
import template from "/components/profile_personal_link/template.hbs";
import {withStore} from "/utils/store.ts";

interface ProfilePersonalLinkProps{
	profile_img: string,
	profile_name: string
}

export class ProfilePersonalLinkInitial extends Block {
	constructor(props: ProfilePersonalLinkProps) {
		super({
			...props
		});
		this.setProps({
			profile_name: this.props["second_name"] + " " + this.props["first_name"]
		});
	}
	protected init(): void {
	}
	render() {
		return this.compile(template, this.props);
	}
}

const withUser = withStore((state) => ({...state.user}));
export const ProfilePersonalLink = withUser(ProfilePersonalLinkInitial);

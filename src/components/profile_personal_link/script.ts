import {Block} from "/utils/block.ts";
import template from "/components/profile_personal_link/template.hbs";
import {withStore} from "/utils/store.ts";

interface ProfilePersonalLinkProps{
	profile_img: string,
	profile_name: string
}

export class ProfilePersonalLink extends Block {
	constructor(props: ProfilePersonalLinkProps) {
		super(props);
	}
	/*protected init(): void {
		this.setProps({
			profile_img: "/img/noimgprofile.svg",
			profile_name: this.props.user.first_name + " " + this.props.user.second_name
		});
	}*/

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		return true;
	}
	render() {

		return this.compile(template, this.props);
	}
}


/*
const withUser = withStore((state) => ({...{user: state.user}}));
export const ProfilePersonalLink = withUser(ProfilePersonalLinkInitial);*/

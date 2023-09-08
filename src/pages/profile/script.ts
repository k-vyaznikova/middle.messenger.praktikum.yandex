import {Block} from "/utils/block.ts";
import template from "/pages/profile/profile.hbs";
import {withStore} from "/utils/store.ts";
import store from "/utils/store.ts";
import img from "/img/noimgprofile.svg";

export class ProfilePageInitial extends Block {
	constructor() {
		super({
			title: "Иван",
			submit_url: "#",
			footer_links: "yes",
			edit_profile_link: "#",
			edit_password_link: "#",
			exit_link: "#",
			profile_photo: {
				profilePhoto: img,
				profileAlt: "Иван"
			},
			profile_items: []
		});
		console.log("jjjjjj");
		console.log(this.props.user);
	}
	init() {/*
		const fieldDisplayNames:Record<string, string> = {
			"email": "E-mail",
			"login": "Логин",
			"first_name": "Имя",
			"second_name": "Фамилия",
			"display_name": "Имя в чате",
			"phone": "Телефон"
		};
		const that: any = this;
		const profileItems: Array<any> = Object.keys(this.props.user).map(function(key) {
			console.log(that);
			return {
				infoLabel: fieldDisplayNames[key],
				value: that.props.user[key],
				infoName: key,
				infoType: "text"
			};
			return 1;
		});
		this.setProps({profile_items: profileItems});*/
	}

	render() {
		return this.compile(template, this.props);
	}
}

const withUser = withStore((state) => ({...state.user}));
export const ProfilePage = withUser(ProfilePageInitial);

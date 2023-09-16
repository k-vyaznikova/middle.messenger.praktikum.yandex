import {Block} from "/utils/block.ts";
import template from "/pages/profile/profile.hbs";
import {withStore} from "/utils/store.ts";
import img from "/img/noimgprofile.svg";

interface profilePageProps {
	title: string,
	footer_links: string,
	profile_photo: {
		profilePhoto: any,
		profileAlt: string,
	},
	profile_items: Array<any>
}

export class ProfilePageInitial extends Block {
	constructor(props: profilePageProps) {
		super({
			...props,
			profile_photo: {
				profilePhoto: img,
				profileAlt: "Иван"
			}
		});
	}
	init() {
		const fieldDisplayNames:Record<string, string> = {
			"email": "E-mail",
			"login": "Логин",
			"first_name": "Имя",
			"second_name": "Фамилия",
			"display_name": "Имя в чате",
			"phone": "Телефон"
		};
		const that: any = this;
		const profileItems: Array<any> = Object.keys(fieldDisplayNames).map(function(key) {
			return {
				infoLabel: fieldDisplayNames[key],
				value: that.props[key],
				infoName: key,
				infoType: "text"
			};
		});
		this.setProps({
			title: this.props.first_name + " " + this.props.second_name,
			profile_items: profileItems
		});
	}

	render() {
		return this.compile(template, this.props);
	}
}

const withUser = withStore((state) => ({...state.user}));
export const ProfilePage = withUser(ProfilePageInitial);

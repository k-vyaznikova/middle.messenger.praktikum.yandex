import {Block} from "/utils/block.ts";
import template from "/pages/profile/profile.hbs";
import {withStore} from "/utils/store.ts";
import img from "/img/noimgprofile.svg";
import {ProfileForm} from "/components/profile_form/script.ts";
import {ProfileItem} from "/components/profile_item/script.ts";
import {User} from "/types/common_types.ts";
import {Link} from "/components/link/script"


export class ProfilePageInitial extends Block {
	constructor(props: User) {
		super(props);
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
		const profileItemsProps: Array<any> = Object.keys(fieldDisplayNames).map(function(key) {
			return {
				infoLabel: fieldDisplayNames[key],
				value: that.props[key],
				infoName: key,
				infoType: "text"
			};
		});


		this.children.profileForm = new ProfileForm({
			title: this.props.first_name + " " + this.props.second_name,
			profile_items: profileItemsProps,
			footer_links: "yes"
		});

		this.children.link = new Link({
			href: "/chat", 
			name: "", 
			class: "back-link"
		});
	}

	render() {
		console.log("in profile_render");
		return this.compile(template, this.props);
	}
}


const withUser = withStore((state) => ({...state.user}));
export const ProfilePage = withUser(ProfilePageInitial);

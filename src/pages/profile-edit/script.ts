import {Block} from "/utils/block.ts";
import template from "/pages/profile-edit/profile-edit.hbs";
import {User} from "/types/common_types";
import {ProfileForm} from "/components/profile_form/script";
import {Link} from "/components/link/script";
import {withStore} from "/utils/store";

export class ProfileEditPageInitial extends Block {
	constructor(props: User) {
		super(props);
	}

	init() {
		const fieldDisplayNames:Record<string, any> = {
			"email": ["E-mail", "email,not-empty"],
			"login": ["Логин", "login,not-empty"],
			"first_name": ["Имя", "name,not-empty"],
			"second_name": ["Фамилия", "name,not-empty"],
			"display_name": ["Имя в чате", ""],
			"phone": ["Телефон", "phone,not-empty"]
		};
		const that: any = this;
		const profileItemsProps: Array<any> = Object.keys(fieldDisplayNames).map(function(key) {
			return {
				infoLabel: fieldDisplayNames[key][0],
				value: that.props[key],
				infoName: key,
				infoType: "text",
				editMode: "yes",
				validate_type: fieldDisplayNames[key][1]
			};
		});


		this.children.profileForm = new ProfileForm({
			title: this.props.first_name + " " + this.props.second_name,
			profile_items: profileItemsProps,
			profile_avatar: this.props.avatar,
			edit_mode: "yes",
			allowEdit: "yes"
		});

		this.children.link = new Link({
			href: "/chat",
			name: "",
			class: "back-link"
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}

const withUser = withStore((state) => ({...state.user}));
export const ProfileEditPage = withUser(ProfileEditPageInitial);

import {Block} from "/utils/block.ts";
import template from "/components/profile_form/template.hbs";
import {SubmitBtnProps} from "/types/common_types.ts";
import { ProfileItem } from "/components/profile_item/script";
import {ProfileItemProps} from "/types/common_types.ts";
import { SubmitBtn } from "/components/submit_btn/script";
import{Link} from "/components/link/script"
import { LogoutBtn } from "/components/logout_btn/script";
import {ProfilePhoto} from "/components/profile_photo/script.ts"

interface ProfileFormProps{
	submit_url?: string,
	title: string,
	profilePhoto?: {
		profileImg: string,
		profileAlt: string
	},
	profile_items: ProfileItemProps[],

	edit_mode?: string,
	submit_btn: SubmitBtnProps,
	footer_links?: string,
	profile_edit_link?: string,
	password_edit_link?: string,
	exit_link?: string,
}

export class ProfileForm extends Block {
	constructor(props: ProfileFormProps) {
		super(props);
	}
	protected init(): void {
		this.children.profile_items = this.props.profile_items.map((props: ProfileItemProps) => {
			return new ProfileItem(props)
		});

		this.children.profilePhoto = new ProfilePhoto({
			profilePhoto: "/img/noimgprofile.svg",
			profileAlt: "Фото профиля"
		});

		this.children.submitBtn = new SubmitBtn({
			text: "Сохранить изменения"
		});
		if(this.props.footer_links){
			this.children.link_1 = new Link({
				href: "/profile-edit", 
				name: "Изменить данные"
			});
			this.children.link_2 = new Link({
				href: "/pass-edit", 
				name: "Изменить пароль"
			});
			this.children.logoutBtn = new LogoutBtn({
				text: "Выйти"
			});
		}
		
	}
	render() {
		return this.compile(template, this.props);
	}
}

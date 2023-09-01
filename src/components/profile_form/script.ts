import {Block} from "/utils/block.ts";
import template from "/components/profile_form/template.hbs";

interface ProfileFormProps{
	submit_url?: string,
	title: string,
	profilePhoto?: {
		profileImg: string,
		profileAlt: string
	},
	profile_items: Array<Object>,
	edit_mode?: string,
	submit_btn:{
		text: string
	},
	footer_links?: string,
	profile_edit_link?: string,
	password_edit_link?: string,
	exit_link?: string,
}

export class ProfileForm extends Block {
	constructor(props: ProfileFormProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}

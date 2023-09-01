import {Block} from "/utils/block.ts";
import template from "/components/community_profile/template.hbs";
import {checkError} from "/utils/validate";
import {getFormData} from "/utils/get_form_data";


interface CommunityProfileProps{
	title: string,
	submit_url: string,
	profile_photo: {
		profileImg: string,
		profileName: string,
	},
	profile_items: Array<Object>,
	submit_btn?: object,
	edit_mode?: string
}
export class CommunityProfile extends Block {
	constructor(props: CommunityProfileProps) {
		super({
			...props,
			submit_btn: {
				text: "Сохранить изменения",
				onClick: (event: Event) => {
					event.preventDefault();
					let resultValid: boolean = true;
					Object.keys(this.refs.form.refs).forEach((key) => {
						if (!checkError(
							this.refs.form.refs[key]?.getContent()?.querySelector("input")?.value,
							(this.refs.form.refs[key]?.props.validate_type as string),
							this.refs.form.refs[key]
						) && resultValid)
							resultValid = false;
					});
					if (resultValid) {
						getFormData(this.refs.form);
					}
				}
			}});
	}
	render() {
		return this.compile(template, this.props);
	}
}

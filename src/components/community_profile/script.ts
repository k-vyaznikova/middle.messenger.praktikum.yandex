import {Block} from "/utils/block.ts";
import template from "/components/community_profile/template.hbs";


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
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}

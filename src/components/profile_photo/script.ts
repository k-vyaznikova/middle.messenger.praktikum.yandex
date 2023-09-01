import {Block} from "/utils/block.ts";
import template from "/components/profile_photo/template.hbs";

interface ProfilePhotoProps{
	profilePhoto: string,
	profileAlt: string
}

export class ProfilePhoto extends Block {
	constructor(props: ProfilePhotoProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}

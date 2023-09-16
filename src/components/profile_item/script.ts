import {Block} from "/utils/block.ts";
import template from "/components/profile_item/template.hbs";

interface ProfileItemProps{
	infoType: string,
	infoName: string,
	infoLabel: string,
	infoPlaceholder: string,
	infoValue: string
}

export class ProfileItem extends Block {
	constructor(props: ProfileItemProps) {
		super(props);
	}

	public get value(): string {
		return (this.element as HTMLElement).getElementsByTagName("input")[0].value;
	}
	render() {
		return this.compile(template, this.props);
	}
}

import {Block} from "/utils/block.ts";
import template from "/components/profile_item/template.hbs";


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

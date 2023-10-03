import {Block} from "/utils/block.ts";
import template from "/components/profile_item/template.hbs";
import {checkError} from "/utils/form_utils";


interface ProfileItemProps{
	infoLabel: string,
	value: string,
	infoName: string,
	infoType?: string,
	editMode?: string,
	validate_type: string,
	events:{
		focusout: () => void
	}
}

export class ProfileItem extends Block {
	constructor(props: ProfileItemProps) {
		super({...props,
			events: {
				focusout: () => {
					checkError(
						this.value,
						this.props.validate_type as string,
						this
					);
				}
			}});
	}

	public get value(): string {
		return (this.element as HTMLElement).getElementsByTagName("input")[0].value;
	}

	public get name(): string {
		return (this.element as HTMLElement).getElementsByTagName("input")[0].getAttribute("name");
	}
	render() {
		return this.compile(template, this.props);
	}
}

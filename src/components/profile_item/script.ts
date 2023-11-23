import {Block} from "./../../utils/block.ts";
import template from "./template.hbs";
import {checkError} from "./../../utils/form_utils";
import {ProfileItemProps} from "./../../types/common_types";


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
		return (this.element as HTMLElement).getElementsByTagName("input")[0].getAttribute("name") as string;
	}
	render() {
		return this.compile(template, this.props);
	}
}

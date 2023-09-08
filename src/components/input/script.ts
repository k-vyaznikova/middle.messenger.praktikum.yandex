import {Block} from "/utils/block.ts";
import template from "/components/input/template.hbs";
import {checkError} from "/utils/validate.ts";

interface InputProps{
	id: string,
	label: string,
	name: string,
	type: string,
	ref: string,
	validate_type: string,
	not_empty?: string,
	onFocusout?: ()=>void,
	onKeyup?: ()=>void,
	events?:{
		focusout: () => void,
		keyup: () => void
	}
}

export class Input extends Block {
	constructor(props: InputProps) {
		super({
			...props,
			events: {
				focusout: () => {
					checkError(
						this.getContent()?.querySelector("input")?.value,
						(this.props.validate_type as string),
						this
					);
				},
				keyup: () => {
					if (props.onKeyup) props.onKeyup();
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}

	public getName() {
		return (this.element as HTMLElement).getElementsByTagName("input")[0].name;
	}
	public getValue() {
		return (this.element as HTMLElement).getElementsByTagName("input")[0].value;
	}
	public setValue(value: string) {
		return (this.element as HTMLElement).getElementsByTagName("input")[0].value = value;
	}
	public getValidateType() {
		const validateType: string | undefined = (this.element as HTMLElement).getElementsByTagName("input")[0].getAttribute("data-validate");
		return validateType? validateType: "";
	}
}



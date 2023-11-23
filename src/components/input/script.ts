import {Block} from "./../../utils/block.ts";
import template from "./template.hbs";
import {checkError} from "./../../utils/form_utils.ts";
import {InputProps} from "./../../types/common_types.ts";


export class Input extends Block {
	constructor(props: InputProps) {
		super({
			...props,
			events: {
				focusout: () => {
					this.setComparisonValue();
					checkError(
						this.value,
						this.validate_type as string,
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

	public get name() {
		return (this.element as HTMLElement).getElementsByTagName("input")[0].name;
	}
	public get value() {
		return (this.element as HTMLElement).getElementsByTagName("input")[0].value;
	}
	public set value(value: string) {
		(this.element as HTMLElement).getElementsByTagName("input")[0].value = value;
	}
	public get validate_type() {
		const validateType: string = (this.element as HTMLElement).getElementsByTagName("input")[0].getAttribute("data-validate") as string;
		return validateType? validateType: "";
	}
	public setComparisonValue() {
		let id: string | unknown;
		if (id = this.props.related_field) {
			const compareElement: HTMLInputElement | null | undefined = this?.element?.parentElement?.querySelector("#"+id);
			if (compareElement instanceof HTMLInputElement) {
				this.setProps({
					value: this.value,
					comparison_value: compareElement.value
				});
			}
		}
	}

	public get comparison_value() {
		const comparisonValue: string | undefined | unknown= this.props.comparison_value;
		return comparisonValue? comparisonValue: "";
	}
}



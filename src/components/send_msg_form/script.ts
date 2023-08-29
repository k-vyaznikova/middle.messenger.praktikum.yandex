import {Block} from "/utils/block.ts";
import template from "/components/send_msg_form/template.hbs";
import {getFormData} from "/utils/get_form_data";
import {validate, ResultValidate} from "/utils/validate";

interface SendMsgFormProps{
	send_msg_text: {
		name: string,
		ref: string,
		value: string,
		validate_type: string
	},
	send_msg_file: {
		name: string,
		ref: string,
		value: string,
		validate_type: string
	},
	onClick?: (event: Event) => void,
	onKeyup?: ()=>void
}

export class SendMsgForm extends Block {
	constructor(props: SendMsgFormProps) {
		super({
			...props,
			onKeyup: () => {
				const textarea: HTMLElement = this.getContent()?.querySelector("textarea") as HTMLElement;
				if (textarea.scrollHeight < 200)
					textarea.style.height = textarea.scrollHeight + "px";
			},
			onClick: (event: Event) => {
				event.preventDefault();
				let res: boolean = true;
				Object.keys(this.refs).forEach((key) => {
					const resultValid: ResultValidate = validate(
						this.refs[key]?.getContent()?.querySelector("input, textarea")?.value,
						(this.refs[key]?.props.validate_type as string)
					);
					if (!resultValid.is_ok && res)
						res = false;
				});
				if (res) {
					getFormData(this);
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}

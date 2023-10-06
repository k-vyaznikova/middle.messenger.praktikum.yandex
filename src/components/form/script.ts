import {Block} from "/utils/block.ts";
import template from "/components/form/template.hbs";
import {LinkProps} from "/types/common_types.ts";
import {InputProps} from "/types/common_types.ts";
import {SubmitBtnProps} from "/types/common_types.ts";
import {Input} from "/components/input/script.ts";
import {Link} from "/components/link/script.ts";
import {SubmitBtn} from "/components/submit_btn/script";
import {ErrorMsgProps} from "/types/common_types.ts";
import {ErrorMsg} from "/components/error_msg/script";
import {checkAndSendForm} from "/utils/form_utils.js";
import {ResultValidate} from "/types/common_types.ts";

interface FormProps{
	title: string,
	ref: string,
	error: ErrorMsgProps,
	inputs: InputProps[],
	submit_btn: SubmitBtnProps,
	link: LinkProps,
	send_function: (data: any) => Promise<ResultValidate>,
	context_func: any
}
export class Form extends Block {
	constructor(props: FormProps) {
		super(props);
	}

	init() {
		this.children.inputs = ((this.props.inputs as Array<any>).map((inputProps: InputProps) => {
			return new Input(inputProps);
		})) as any;
		this.children.submitBtn = new SubmitBtn({
			...(this.props.submit_btn as SubmitBtnProps),
			onClick: (event: Event) => {
				event.preventDefault();
				checkAndSendForm(this, (this.props.send_function as (arg:any)=>Promise<any>).bind(this.props.context_func), "/messenger");
			}
		});
		this.children.link = new Link(this.props.link as LinkProps);
		this.children.errorMsg = new ErrorMsg(this.props.error as ErrorMsgProps);
	}

	render() {
		return this.compile(template, this.props);
	}
}



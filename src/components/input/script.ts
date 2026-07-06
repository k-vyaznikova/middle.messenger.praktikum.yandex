import {Block} from "../../utils/block/block";
import template from "/components/input/template.hbs";
import styles from "/components/input/style.module.scss";
import { checkRequired, checkEmail, checkName, checkPhone, checkLogin, checkPassword, checkPasswordConfirm } from "./validate";
import type {InputProps} from "/types";

class Input extends Block {
	_value: string = "";
	constructor(props: InputProps) {
		super({
			...props,
			styles/*,
			events: {
				focusout: () => {
					if (props.onFocusout) props.onFocusout();
				},
				keyup: () => {
					if (props.onKeyup) props.onKeyup();
				}
			}*/
		});
		this._value = props.value ?? "";
	}

	init() {
		let requiredFunc: (() => void | Error) | undefined = undefined;
		let checkFormatFunc: (() => void | Error) | undefined = undefined;
		let checkPasswordConfirmFunc: (() => void | Error) | undefined = undefined;
		if (this.props.required) {
			requiredFunc = () => {
				let val = this.getValue()?.toString() || "";
				if (checkRequired && checkRequired(val)) {
					return checkRequired(val);
				}
				return;
			}
		}
		
		if(this.props.pattern && this.props.pattern.length > 0) {
			checkFormatFunc = () => {
				let val = this.getValue()?.toString() || "";
				for(const pattern of this.props.pattern) {
					switch(pattern) {
						case "email":
							if(checkEmail(val)) {
								return checkEmail(val);
							}
							break;
						case "phone":	
							if(checkPhone(val)) {
								return checkPhone(val);
							}
							break;
						case "name":
							if(checkName(val)) {
								return checkName(val);
							}
							break;
						case "login":
							if(checkLogin(val)) {
								return checkLogin(val);
							}
							break;
						case "password":
							if(checkPassword(val)) {
								return checkPassword(val);
							}
							break;
					}
				}
				return;
			}
		}
		if(this.props.equal_to) {
			checkPasswordConfirmFunc = () => {
				let val = this.getValue()?.toString() || "";
				let comparisonVal = (document.getElementById(this.props.equal_to) as HTMLInputElement)?.value?.toString() || "";
				if(checkPasswordConfirm && checkPasswordConfirm(val, comparisonVal)) {
					return checkPasswordConfirm(val, comparisonVal);
				}
				return;
			}
		}
		
		
			let resultFocusoutFunc = () => {
				if(this.props.onFocusout && typeof this.props.onFocusout === "function") {
					this.props.onFocusout();
				}
				let error : string | undefined = undefined;
				if (!error &&	requiredFunc) {
					error = requiredFunc()?.message ?? undefined;
					if (error) {
						this.setProps({error: error});
					}
				}				
				if(!error &&	checkFormatFunc) {
					error = checkFormatFunc()?.message ?? undefined;
					if (error) {
						this.setProps({error: error});
					}
				}
				if(!error &&	checkPasswordConfirmFunc) {
					error = checkPasswordConfirmFunc()?.message ?? undefined;
					if (error) {
						this.setProps({error: error});
					}
				}
				if(!error)
					this.setProps({error: ""});
				
			}
			
			let resultKeyupFunc: () => void = () => {				
					const input = this.element?.querySelector("input") as HTMLInputElement;
					this._value = input.value;
					const pos = input.selectionStart ?? this._value.length;
				  
					this.setProps({ value: this._value });  // перерисовка
				  
					const newInput = this.element?.querySelector("input") as HTMLInputElement;
					newInput.focus();
					newInput.setSelectionRange(pos, pos);
			}

			
			this.setProps({
				events: {
					focusout: resultFocusoutFunc,
					keyup: resultKeyupFunc
				}
			});	

			
			
		

	}


	componentDidUpdate(newProps: any) {
		const input = this.element?.querySelector("input") as HTMLInputElement;
		if (!input) return false;
	  
		input.value = this._value;  // восстановить текст из _value
		return true;
	}

	getValue = () => {
		return this.element?.querySelector("input")?.value.toString();
	}
	render() {
		return this.compile(template, this.props);
	}


}

export {Input};
export type {InputProps};



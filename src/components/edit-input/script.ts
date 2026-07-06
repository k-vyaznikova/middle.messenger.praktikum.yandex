import {Block} from "../../utils/block/block";
import template from "./template.hbs";
import styles from "./style.module.scss";
import { checkRequired, checkEmail, checkName, checkPhone, checkLogin, checkPassword } from "./validate";
import type {InputProps} from "/types";
import Icon from "/components/icon/script";
import UserController from "/controllers/user-controller";

class EditInput extends Block {
	_value: string = "";
	private _shouldFocus = false;
	constructor(props: InputProps) {
		super({
			...props,
			styles,
			isEditing: false,
		});
		this._value = props.value ?? "";
	}

	init() {
		let requiredFunc: (() => void | Error) | undefined = undefined;
		let checkFormatFunc: (() => void | Error) | undefined = undefined;
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
				if(!error){
					this.setProps({error: ""});
					this.setProps({isEditing: false});
					UserController.setNewDataProfile({[this.props.name]: this.getValue()?.toString() || ""});

				}
					
				
			}
			
			let resultKeyupFunc: () => void = () => {
				const input = this.element?.querySelector("input") as HTMLInputElement;
				if (!input) return;
				this._value = input.value;
			}

			
			this.setProps({
				events: {
					focusout: resultFocusoutFunc,
					keyup: resultKeyupFunc,
					focusin: () => {
						//alert("focus");
						//this.setProps({isEditing: true});
					}
				}
			});	

			this.children.icon = new Icon({
				type: "edit",
				onClick: () => {
					this._shouldFocus = true;
					this.props.isEditing = true;
				}
			});
			
		

	}


	componentDidUpdate() {
		const input = this.element?.querySelector("input") as HTMLInputElement;
		if (!input) return false;

		input.value = this._value;

		if (this._shouldFocus) {
			this._shouldFocus = false;
			input.focus();
			const pos = this._value.length;
			input.setSelectionRange(pos, pos);
		}

		return true;
	}

	getValue = () => {
		return this.element?.querySelector("input")?.value.toString();
	}
	render() {
		return this.compile(template, this.props);
	}


}

export {EditInput};



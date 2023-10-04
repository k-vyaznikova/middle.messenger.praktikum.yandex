import {Input} from "/components/input/script.ts";
import {ProfileItem} from "/components/profile_item/script.ts";
import {Form} from "/components/form/script.ts";
import {SendMsgText} from "/components/send_msg_text/script.ts";
import {ResultValidate} from "/types/common_types.ts";
import router from "/utils/routing/router.ts";

function comparePassword(pass: string | undefined, passConfirm: string): ResultValidate {
	let result: ResultValidate = {
		is_ok: true,
		msg_text: null
	};
	if (pass !== passConfirm) {
		result = {
			is_ok: false,
			msg_text: "Неверное подтвержление пароля"
		};
	}
	return result;
}

export function validate(value: string, typeString: string) : ResultValidate {
	let format: RegExp;
	const resultOk: ResultValidate = {
		is_ok: true,
		msg_text: null
	};
	if (!typeString) {
		return resultOk;
	}
	const types: Array<string> = typeString.split(",").map((type)=> type.trim());
	if (types.includes("not-empty")) {
		if (value === "") {
			return {
				is_ok: false,
				msg_text: "Поле не может быть пустым"
			};
		}
	}
	for (const type of types) {
		if (type!="not-empty") {
			switch (type) {
			case "name":
				format = /^([А-Я]{1}[а-я-]{1,})|([A-Z]{1}[a-z-]{1,})$/;
				if (!format.test(value)) {
					return {
						is_ok: false,
						msg_text: "Латиница или кириллица, с заглавной буквы"
					};
				}
				break;
			case "phone":
				format = /^\+{0,1}[0-9]{10,15}$/;
				if (!format.test(value)) {
					return {
						is_ok: false,
						msg_text: "Неверный формат"
					};
				}
				break;
			case "email":
				format = /^[а-яА-Яa-zA-Z0-9._%+-]+@[а-яА-Яa-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				if (!format.test(value)) {
					return {
						is_ok: false,
						msg_text: "Неверный формат электронной почты"
					};
				}
				break;
			case "login":
				format = /^(?=.{3,20}$)([a-zA-Z-_0-9]*[a-zA-Z-_]+[a-zA-Z-_0-9]*)$/;
				if (!format.test(value)) {
					return {
						is_ok: false,
						msg_text: "Используйте латиницу, цифры, _ и -. Не меньше 3 символов."
					};
				}
				break;
			case "password":
				format = /^(?=.{8,40}$)(.*[A-ZА-Я]+.*[0-9]+.*)|(.*[0-9]+.*[A-ZА-Я]+.*)$/;
				if (!format.test(value)) {
					return {
						is_ok: false,
						msg_text: "Должно быть не меньше 8 символов, заглавные буквы и цифры"
					};
				}
				break;
			}
		}
	}
	return resultOk;
}


export function checkError(value: string | undefined, typeString: string, component: Input | SendMsgText | ProfileItem): boolean {
	let result: ResultValidate = validate(value as string, typeString as string);
	if (component.constructor === Input) {
		if (result.is_ok && component?.comparison_value) {
			result = comparePassword(value, component?.comparison_value as string);
		}
	}

	if (!result.is_ok) {
		component.setProps({
			error: result.msg_text,
			value: value
		});
		return false;
	} else {
		component.setProps({
			error: "",
			value: value
		});
		return true;
	}
}

export function checkAndSendForm<T>(form: Form, send: (d: T) => Promise<any>, successUrl: string = "/chats") {
	const inputs: Input[] = (form.children.inputs? form.children.inputs : []) as Input[];
	let resultValid: boolean = true;
	inputs.forEach((input) => {
		if (!checkError(input.value, input.validate_type, input) && resultValid)
			resultValid = false;
	});

	if (resultValid) {
		const dataPair: Array<any> = inputs.map(function(input) {
			return [input.name, input.value];
		});
		const data = Object.fromEntries(dataPair) as T;

		send(data).then(function(result: ResultValidate) {
			if (result.is_ok)
				router.go(successUrl);
			else {
				form.children.errorMsg.setProps({
					text: result.msg_text ? (result.msg_text as string) : "Ошибка сервера"
				});
			}
		});
	}
}

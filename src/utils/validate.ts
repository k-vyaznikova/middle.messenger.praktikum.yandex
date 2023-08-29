import {Block} from "/utils/block.ts";

export interface ResultValidate{
	is_ok: boolean,
	msg_text: string | null
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
			}
		}
	}
	return resultOk;
}


export function checkError(value: string | undefined, typeString: string, component: Block): boolean {
	const result: ResultValidate = validate(value as string, typeString as string);
	console.log(value);
	console.log(typeString);
	if (!result.is_ok) {
		component.setProps({
			error: result.msg_text,
			value: value
		});
		return false;
	} else {
		component.setProps({
			error: result.msg_text,
			value: value
		});
		return true;
	}
}


export function checkRequired(value: string) : Error | undefined{
	if (value.trim() === "") {
		return new Error("Поле не может быть пустым");
	}
	return;
}

export function checkEmail(value: string) : Error | undefined{
	if (!/^[а-яА-Яa-zA-Z0-9._%+-]+@[а-яА-Яa-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
		return new Error("Неверный формат электронной почты");
	}
	return;
}

export function checkPhone(value: string) : Error | undefined{
	if (!/^\+{0,1}[0-9]{10,15}$/.test(value)) {
		return new Error("Неверный формат телефона");
	}
	return;
}

export function checkName(value: string) : Error | undefined{
	if (!/^([А-Я]{1}[а-я-]{1,})|([A-Z]{1}[a-z-]{1,})$/.test(value)) {
		return new Error("Имя должно быть на кириллице или латинице, с заглавной буквы");
	}
	return;
}

export function checkLogin(value: string) : Error | undefined{
	if (!/^(?=.{3,20}$)([a-zA-Z-_0-9]*[a-zA-Z-_]+[a-zA-Z-_0-9]*)$/.test(value)) {
		return new Error("Неверный формат логина");
	}
	return;
}

export function checkPassword(value: string) : Error | undefined{
	if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(value)) {
		return new Error("Неверный формат пароля");
	}
	return;
}

export function checkPasswordConfirm(value: string, password: string) : Error | undefined{
	if (value !== password) {
		return new Error("Пароли не совпадают");
	}
	return;
}
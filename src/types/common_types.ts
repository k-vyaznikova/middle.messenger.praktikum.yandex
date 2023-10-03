export interface ResultValidate{
	is_ok: boolean,
	msg_text: string | null
}


export interface User {
	id: number;
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
	avatar: string;
}

export interface SearchData{
    login: string
}

export interface LinkProps{
	href: string;
	name?: string;
	ref?: string,
	class?:string,
	func_before?: () => void,
	events?: {
	  click: (event: Event) => void;
	};
}

export interface SubmitBtnProps{
	text: string,
	add_class?: string,
	onClick?: (event: Event) => void,
	events?:{
		click: (event: Event) => void
	}
}

export interface InputProps{
	id: string,
	label: string,
	name: string,
	type: string,
	ref: string,
	validate_type?: string,
	not_empty?: string,
	related_field?: string,
	comparison_value?: string,
	error: string,
	onFocusout?: ()=>void,
	onKeyup?: ()=>void,
	events?:{
		focusout: () => void,
		keyup: () => void
	}
}


export interface ErrorMsgProps{
	text: string
}

export interface ProfileItemProps{
	infoType: string,
	infoName: string,
	infoLabel: string,
	infoValue: string
}

export interface ChangePassData{
	oldPassword: string,
	newPassword: string
}


export interface Chat {
		"id": number,
		"title": string,
		"avatar": string,
		"unread_count": number,
		"created_by": number,
		"last_message": {
		  "user": {
			"first_name": string,
			"second_name": string,
			"avatar": string,
			"email": string,
			"login": string,
			"phone": string
		  },
		  "time": Date,
		  "content": string
		}
}

export interface ChatIdAndUsers{
	chatId: number,
	users: number[]
}

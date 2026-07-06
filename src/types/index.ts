export interface InputProps{
	value?: string,
	id: string,
	label: string,
	name: string,
	type: string,
	pattern?: Array<string>,
	error?: string,
	required?: boolean,
	onFocusout?: () => void,
}



export type  Result =  Error | true;

//********************** */








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




export interface ErrorMsgProps{
	text: string
}

export interface ProfileItemProps{
	infoLabel: string,
	value: string,
	infoName: string,
	infoType?: string,
	editMode?: string,
	validate_type: string,
	events:{
		focusout: () => void
	}
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

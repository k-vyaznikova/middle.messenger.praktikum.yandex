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


import {Block} from "/utils/block.ts";
import template from "/pages/auth/auth.hbs";
import {renderPage} from "/utils/render_page.ts";
import {validate} from "/utils/validate.js";

interface AuthPageProps {
    title: String,
    inputs: [],
    secondary_btn: Object,
    submit_btn: Object
}

export class AuthPage extends Block {
	constructor(props: AuthPageProps) {
		super(
            {
                title: "Вход",
                inputs:[
                    {
                        name: "login",
                        label: "Логин",
                        id: "login_auth",
                        type: "text",
                        error: "Тестовая ошибка",
                        ref: "input_login",
                        onFocusout: () => {console.log(this);console.log(this.refs)}
                    },
                    {
                        name: "password",
                        label: "Пароль",
                        id: "password_auth",
                        type: "password",
                        ref: "input_password",
                        error: "Тестовая ошибка",
                    }
                ],
                secondary_btn: {
                    text: "Нет аккаунта?",
                    href: "#",
                    onClick: () => {renderPage("register"); return false;}
                },
                submit_btn:{
                    text: "Авторизоваться",
                    onClick: () => {renderPage("auth"); return false;}
                }
               
            });
	}

	render() {
		return this.compile(template, this.props);
	}
}

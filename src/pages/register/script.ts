import {Block} from "/utils/block.ts";
import template from "/pages/register/register.hbs";
import {renderPage} from "/utils/render_page.ts";
export class RegisterPage extends Block {
    constructor(props: AuthPageProps) {
		super(
            {
                title: "Регистрация",
                inputs:[
                    {
                        name: "email",
                        label: "Почта",
                        id: "email_reg",
                        type: "text",
                        error: "Тестовая ошибка",
                    },
                    {
                        name: "login",
                        label: "Логин",
                        id: "login_reg",
                        type: "text",
                        error: "Тестовая ошибка",
                    },
                    {
                        name: "first_name",
                        label: "Имя",
                        id: "first_name_reg",
                        type: "text",
                        error: "Тестовая ошибка",
                    }, 
                    {
                        name: "second_name",
                        label: "Фамилия",
                        id: "second_name_reg",
                        type: "text",
                        error: "Тестовая ошибка",
                    },                   
                    {
                        name: "password",
                        label: "Пароль",
                        id: "password_reg",
                        type: "password",
                        error: "Тестовая ошибка",
                    },                   
                    {
                        name: "password",
                        label: "Пароль (ещё раз)",
                        id: "password_conf_reg",
                        type: "password",
                        error: "Тестовая ошибка",
                    }
                ],
                secondary_btn: {
                    text: "Зарегистрироваться",
                    href: "false",
                    onClick: () => {renderPage("auth")}
                },
                submit_btn:{
                    text: "Войти",
                    //href: "false",
                    onClick: () => {
                        console.log("котпупклопук")                   
                     }
                }
               
            });
	}

	render() {
		return this.compile(template, this.props);
	}


}

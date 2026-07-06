const fields: Array<Record<string, string | boolean | Function | Array<string>>> = [
    {
        id: "login_reg",
        name: "login",
        label: "Логин",
        type: "text",
        error: "",
        required: true,
        pattern: ["login"],
        value: ""
    },
    {
        id: "email_reg",
        name: "email",
        label: "E-mail",
        type: "text",
        required: true,
        pattern: ["email"],
        value: ""
    },
    
    {
        id: "first_name_reg",
        name: "first_name",
        label: "Имя",
        type: "text",
        required: true,
        pattern: ["name"],
        value: ""
    },
    {
        id: "second_name_reg",
        name: "second_name",
        label: "Фамилия",
        type: "text",
        required: true,
        pattern: ["name"],
        value: ""
    },
    {
        id: "phone_reg",
        name: "phone",
        label: "Телефон",
        type: "text", 
        required: false,
        pattern: ["phone"],
        value: ""
    },
    {
        id: "password_reg",
        name: "password",
        label: "Пароль",
        type: "password",
        pattern: ["password"],
        required: true,
        value: ""
    },
    {
        name: "password_confirm",
        label: "Повторите пароль",
        id: "password_confirm_reg",
        type: "password",
        required: true,
        equal_to: "password_reg",
        value: ""
    }
];
export default fields;
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
    }
];
export default fields;
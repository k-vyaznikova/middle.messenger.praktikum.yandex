const fields: Array<Record<string, string | boolean | Function | Array<string>>> = [
    {
        id: "login_auth",
        name: "login",
        label: "Логин",
        type: "text",
        error: "",
        required: true,
        pattern: ["login"],
        value: "____________!!!!kristina1234567890_"
    },
    {
        id: "password_auth",
        name: "password",
        label: "Пароль",
        type: "password",
        pattern: ["password"],
        required: true,
        value: "abc123!X"
    }
];
export default fields;
const fields: Array<Record<string, string | boolean | Function | Array<string>>> = [
    {
        id: "oldPassword_pass",
        name: "oldPassword",
        label: "Старый пароль",
        type: "password",
        error: "",
        required: true,
        value: ""
    },
    {
        id: "newPassword_pass",
        name: "newPassword",
        label: "Новый пароль",
        type: "password",
        pattern: ["password"],
        error: "",
        required: true,
        value: ""
    },
    {
        id: "newPassword_conf_pass",
        name: "newPassword",
        label: "Повторите пароль",
        type: "password",
        error: "",
        required: true,
        equal_to: "newPassword_pass",
        value: ""
    }
];
export default fields;
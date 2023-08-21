import {AuthPage} from "/pages/auth/script.ts";
import {SecondaryBtn} from "/components/secondary_btn/script.ts";
window.addEventListener("DOMContentLoaded", () => {
    
    const root = document.querySelector("#app");
    const secondaryBtn = new SecondaryBtn({
        "__href": "#",
        "__class": "reg-link",
        "textLink": "Зарегистрироваться",
        events:{
            "mouseover": ()=>{console.log("mouseover!")}
        }
    });
    //const auth = new AuthPage({"secondary_btn": secondaryBtn});
    const auth = new AuthPage({"secondary_btn": secondaryBtn});
    root.append(auth.getContent());
    //root.append(secondaryBtn.getContent());
});

import Handlebars from "handlebars/runtime";
import "./style.scss";
import chatInfo from "./template.hbs";
Handlebars.registerPartial('profile-item', chatInfo);


document.addEventListener('DOMContentLoaded', function(){
    let container = document.querySelector("#app");
    container.addEventListener('appContentLoaded', function(){
        //Изменение области textarea
        let msgTextarea = document.querySelector("textarea.profile-value");
        if(msgTextarea){
            msgTextarea.addEventListener("keyup", function(){
                console.log(this.scrollHeight);
                    this.style.height = this.scrollHeight + 'px';
            });
        }
    });
});    














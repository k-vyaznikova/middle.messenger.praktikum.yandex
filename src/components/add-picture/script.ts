import Handlebars from "handlebars/runtime";
import "./style.scss";
import editPhoto from "./template.hbs";
Handlebars.registerPartial('edit-photo', editPhoto);


document.addEventListener('DOMContentLoaded', function(){
    let container = document.querySelector("#app");
    container.addEventListener('appContentLoaded', function(){
        
    });
});    







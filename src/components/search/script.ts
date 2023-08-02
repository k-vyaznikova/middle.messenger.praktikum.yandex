import Handlebars from "handlebars/runtime";
import "./style.scss";
import search from "./template.hbs";
Handlebars.registerPartial('search', search);

document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector("#app");
    
    container.addEventListener('appContentLoaded', function(){
        const search = this.querySelector(".search-input");
        if(search){
            search.addEventListener('focus',function (){
           
                this.classList.remove("empty-search");
                
            });
            search.addEventListener('blur', function(){
                    if(this.value.trim().length <= 0)   
                        this.classList.add("empty-search");
            });
        }
        

        
        
    });
});










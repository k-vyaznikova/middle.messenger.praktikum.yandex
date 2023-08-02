import Handlebars from "handlebars/runtime";
import "./style.scss";
import search from "./template.hbs";
Handlebars.registerPartial('search', search);

document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector("#app");
    
    container.addEventListener('appContentLoaded', function(){
       
        this.querySelector(".search-input").addEventListener('focus',function (){
           
                this.classList.remove("empty-search");
                
        });
        this.querySelector(".search-input").addEventListener('blur', function(){
                if(this.value.trim().length <= 0)   
                    this.classList.add("empty-search");
        });

        
        
    });
});










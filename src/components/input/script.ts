import Handlebars from "handlebars/runtime";
import "./style.scss";
import inputText from "./template.hbs";
Handlebars.registerPartial('input', inputText);

document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector("#app");
    container.addEventListener('DOMAttrModified', function(){
        this.querySelectorAll(".input-container input[type='text'], .input-container input[type='password']").forEach(function(input){
            input.addEventListener('keyup',function (){
                if(this.value.length > 0){
                    this.parentElement.querySelector("label").classList.add("visible");
                    this.parentElement.querySelector(".error").classList.add("visible"); // to fix: with condition
                }
                    
                else{
                    this.parentElement.querySelector("label").classList.remove("visible");
                    this.parentElement.querySelector(".error").classList.remove("visible"); // to fix: with condition
                }
                    
                
            });
            
        });
        
        
    });
});








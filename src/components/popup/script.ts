import Handlebars from "handlebars/runtime";
import "./style.scss";
import popup from "./template.hbs";
Handlebars.registerPartial('popup', popup);



document.addEventListener('DOMContentLoaded', function(){
    let container = document.querySelector("#app");
    
    function showPopup(){
        const changePhotoBlock = container.querySelector(".popup-block-invis");
        if(changePhotoBlock)
            changePhotoBlock.classList.add("visible");
    }
    function hidePopup(){
        const changePhotoBlock = container.querySelector(".popup-block-invis");
        if(changePhotoBlock)
            changePhotoBlock.classList.remove("visible");
    }

    if(container){
        container.addEventListener('appContentLoaded', function(){
            const invisBlock = container.querySelector(".popup-block-invis");
            if(invisBlock){
                const actLink = invisBlock.getAttribute("data-act-selector");
                const bckgPopup = container.querySelector(".background-popup");
                const close = container.querySelector(".close");
                if(actLink)
                    container.querySelector(actLink).addEventListener("click", function(event){
                        event.preventDefault();
                        showPopup();
                    });
                if(bckgPopup){
                    bckgPopup.addEventListener("click", function(){
                        hidePopup();
                    });
                }  
                if(close){
                    close.addEventListener("click", function(){
                        hidePopup();
                    });
                }   
    

                
                
    
    
            }
            
            
        });
    }
});










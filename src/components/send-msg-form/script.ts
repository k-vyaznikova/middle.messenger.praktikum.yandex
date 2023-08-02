import Handlebars from "handlebars/runtime";
import "./style.scss";
import sendMsgForm from "./template.hbs";
Handlebars.registerPartial('send-msg-form', sendMsgForm);

/*
function getParents(elem, finishParent = document) {
    var parents = [];
    while(elem.parentNode) {
      elem = elem.parentNode;
      parents.push(elem);
      if(elem.parentNode === document)
        break;
    }
    return parents;
  }
*/

document.addEventListener('DOMContentLoaded', function(){
    let container = document.querySelector("#app");
    container.addEventListener('appContentLoaded', function(){
        
        let btnSelect = this.querySelector(".form button.attach-btn");
        let msgTextarea = container.querySelector("#send-msg");


        //Выбор вложения
        if(btnSelect){
            let attachTypeSelect = btnSelect.parentElement.querySelector(".attach-type-container");
            btnSelect.addEventListener('click', function(event){ //открываем окно с выбором типа вложения
                event.preventDefault();
                let attachTypeSelect =  this.parentElement.querySelector(".attach-type-container");
                if(!attachTypeSelect.classList.contains('visible'))
                    attachTypeSelect.classList.add("visible");
                else    
                    attachTypeSelect.classList.remove("visible");   
            });

            /**Вызов выбора файла-картинки */
            const picItem = container.querySelector(".pic");
            const docItem = container.querySelector(".doc");


            //Переделать в клик по массиву объектов?
            if(picItem){
                picItem.addEventListener("click", function(event){
                    event.preventDefault();
                    const attachFile = container.querySelector(".attach-file");
                    attachFile.accept = "image/*";
                    container.querySelector(".attach-file").click();

                });
            }
            if(docItem){
                docItem.addEventListener("click", function(event){
                    event.preventDefault();
                    const attachFile = container.querySelector(".attach-file");
                    attachFile.accept = ".doc, .docx, .pdf";
                    container.querySelector(".attach-file").click();

                });
            }
            
            
            container.addEventListener("click", function(event){ //убираем окно с выбором типа вложения
                if(attachTypeSelect.classList.contains('visible')){
                    let clickedElem = event.target;
                    if(clickedElem != btnSelect)
                        attachTypeSelect.classList.remove("visible"); 
                }

                


            });


        }


        //Изменение области textarea
        if(msgTextarea){
            msgTextarea.addEventListener("keyup", function(){
                    if(this.scrollHeight < 200)
                        this.style.height = this.scrollHeight + 'px';  
            });
        }
        
        


    });
});    











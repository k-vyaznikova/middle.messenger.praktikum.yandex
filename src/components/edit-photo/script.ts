import Handlebars from "handlebars/runtime";
import "./style.scss";
import editPhoto from "./template.hbs";
Handlebars.registerPartial('edit-photo', editPhoto);


document.addEventListener('DOMContentLoaded', function(){
    let container = document.querySelector("#app");
    container.addEventListener('appContentLoaded', function(){
        /**разделить */
        const uploadLink = container.querySelector(".upload-link");
        const file = container.querySelector(".upload-file");
        const fileContainer = container.querySelector(".selected-file");
        const fileName = container.querySelector(".selected-file-name");
        const fileCancel = container.querySelector(".selected-file-cancel");
        const uploadStatus = container.querySelector(".upload-status");
        const formSetAvatar = container.querySelector(".set-avatar");
        const submitBtn = container.querySelector(".cta-btn");
        const error = container.querySelector(".err");

        if(uploadLink){
            uploadLink.addEventListener("click", function(event){
                event.preventDefault();
                this.previousElementSibling.click();
            });
        }
        if(file){
            file.addEventListener("change", function(){
                if(this.value.trim() != ""){
                if(uploadStatus) uploadStatus.innerHTML = "Файл загружен";
                    if(uploadLink) uploadLink.classList.add("invisible");
                    if(fileContainer) fileContainer.classList.add("visible");
                    if(fileName){
                        const arrName = this.value.split("/").join("\\").split("\\");
                        fileName.innerHTML = arrName[arrName.length - 1];
                    }
                }
                
            });
            fileCancel.addEventListener("click", function(){

                /**сброс формы при нажатии на крестик */
                if(formSetAvatar) formSetAvatar.reset();
                if(uploadStatus) uploadStatus.innerHTML = "Загрузите файл";
                if(uploadLink) uploadLink.classList.remove("invisible");
                fileContainer.classList.remove("visible");
            });
        }

        if(submitBtn){
            submitBtn.addEventListener("click", function(event){
                event.preventDefault();
                if(!file.value)
                    if(error) error.innerHTML = "Необходимо выбрать файл"
            });
        }
    });
});    







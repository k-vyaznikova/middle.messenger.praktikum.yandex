import Handlebars from "handlebars/runtime";
import "./style.scss";
import profilePhoto from "./template.hbs";
Handlebars.registerPartial('profile-photo', profilePhoto);


document.addEventListener('DOMContentLoaded', function(){
    let container = document.querySelector("#app");
    container.addEventListener('appContentLoaded', function(){
        const photoBlock = container.querySelector(".profile-photo");
        if(photoBlock){
            const changeAvatar = this.querySelector(".change-avatar");
            if(changeAvatar){
                photoBlock.addEventListener("mouseover", function(){
                    changeAvatar.classList.add("visible");
                    });
                photoBlock.addEventListener("mouseout", function(){
                    changeAvatar.classList.remove("visible");
                });

                changeAvatar.addEventListener("click", function(event){
                    event.preventDefault();
                    const changePhotoBlock = container.querySelector(".popup-block-invis");
                    if(changePhotoBlock)
                        changePhotoBlock.classList.add("visible");
                });
            }
            

        }
    });
});    







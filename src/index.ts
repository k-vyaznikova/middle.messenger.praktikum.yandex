import Handlebars from "handlebars/runtime";

import "./styles/index.scss";

import auth from "./pages/auth.hbs";
import register from "./pages/register.hbs";
import chat from "./pages/chat.hbs";
import error from "./pages/error.hbs";
import profile from "./pages/profile.hbs";
import profileEdit from "./pages/profile-edit.hbs";
import pswEdit from "./pages/password-edit.hbs";
import community from "./pages/community.hbs";
import communityEdit from "./pages/community-edit.hbs";

import "./components/input/script";
import "./components/submit-btn/script";
import "./components/search/script";
import "./components/contact-item/script";
import "./components/chat-info/script";
import "./components/date-msg/script";
import "./components/incoming-msg/script";
import "./components/outgoing-msg/script";
import "./components/send-msg-form/script";
import "./components/profile-item/script";
import "./components/back-link/script";
import "./components/profile-photo/script";
import "./components/secondary-btn/script";
import "./components/edit-photo/script";
import "./components/member-short-info/script";




/**Хелперы - if с проверкой равенства*/
Handlebars.registerHelper('if_eq', function(a, b, opts) {
  if (a == b) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});


/**Хелперы - попап */
Handlebars.registerHelper("popup", function(options) {
  let strBefore = "<div class = 'popup-block-invis'>" + 
    "<div class = 'popup-block-container'>" + 
      "<div class = 'popup-block'>" + 
          "<div class = 'close-block'>" + 
              "<div class = 'close'>&times;</div>" + 
          "</div>";
  let strAfter = "</div>" + 
        "</div>" + 
        "<div class = 'background-popup'></div>" + 
        "</div>";

  return new Handlebars.SafeString(strBefore + options.fn(this) + strAfter);
});



document.addEventListener('DOMContentLoaded', () => {
  let root = document.querySelector("#app");
  const locationArr = window.location.pathname.split("/");
  const pageAddress = locationArr[locationArr.length - 1];
  let result;
  
  switch (pageAddress){
    case "auth":   
      result = auth({
        urlSubmit: "#"
      }); 
      break;
    case "register":   
      result = register({
        urlSubmit: "#"
      });
      break;
    case "chat": 
      result = chat();
      break;
    case "community": 
      result = community();
      break;  
    case "community-edit": 
      result = communityEdit();
      break;   
    case "profile": 
      result = profile({
        profilePhoto: "img/profile-photo.svg"
      });
      break;  
    case "profile-edit": 
      result = profileEdit({
        profilePhoto: "img/profile-photo.svg"
      });
      break;   
    case "password-edit": 
      result = pswEdit({
        profilePhoto: "img/profile-photo.svg"
      });
      break;     
    case "err500": 
      result = error({
        errorNumber: "500",
        errorText: "Мы уже фиксим",
        errorLinkText: "Назад к чатам",
        errorHref: "/chat"
      });
      break;  
    default:   result = error({
      errorNumber: "404",
      errorText: "Нет такой страницы",
      errorLinkText: "Назад к чатам",
      errorHref: "/chat"
    });
  }

 
  if(root){
    root.innerHTML = result;
    let event = new Event("appContentLoaded");
    root.dispatchEvent(event);
  }
});


document.addEventListener('DOMContentLoaded', function(){
  
  let container = document.querySelector("#app");
      const close = container.querySelector(".popup-block-invis .close");
      const background = container.querySelector(".popup-block-invis .background-popup");
      if(close && background){
        let popup = close;
        while(!popup.classList.contains("popup-block-invis"))
          popup = popup.parentElement;
        if(popup.classList.contains("popup-block-invis")){
          close.addEventListener('click', () => {popup.classList.remove("visible")}); 
          background.addEventListener('click', () => {popup.classList.remove("visible")});
        }
      }
});  






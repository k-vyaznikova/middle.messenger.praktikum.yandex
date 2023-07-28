import Handlebars from "handlebars/runtime";

import "./styles/index.scss";

import auth from "./pages/auth.hbs";
import register from "./pages/register.hbs";
import chat from "./pages/chat.hbs";
import error from "./pages/error.hbs";
import profile from "./pages/profile.hbs";
import profileEdit from "./pages/profile-edit.hbs";
import pswEdit from "./pages/password-edit.hbs";

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
import "./components/popup/script";

import buttonSecondary from "./partials/button-secondary.hbs";



//Handlebars.registerPartial('input-password', inputPassword);
//Handlebars.registerPartial('button-cta', buttonCta);
Handlebars.registerPartial('button-secondary', buttonSecondary);

document.addEventListener('DOMContentLoaded', () => {
  let root = document.querySelector("#app");
  const locationArr = window.location.href.split("/");
  const pageAddress = locationArr[locationArr.length - 1];
  
  //console.log(pageAddress);
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
      result = chat({});
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
  //console.log(result);


 
  if(root){
    root.innerHTML = result;
    let event = new Event("appContentLoaded");
    root.dispatchEvent(event);
  }
  

});




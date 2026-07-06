import Handlebars from "handlebars";
import container from "./container";
import formContainer from "./formContainer";

function RegisterHelper(){
    Handlebars.registerHelper("container", container);
    Handlebars.registerHelper("formContainer", formContainer);
};

export default RegisterHelper;

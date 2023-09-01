declare module "*.hbs"{
    import {TemplateDelegate} from "handlebars";
    const template: TemplateDelegate;
    export default template;
}
declare module "*.svg"{
    const content: string;
    export default content;
}
declare module "*.jpg"{
    const content: string;
    export default content;
}

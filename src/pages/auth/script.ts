import {Block} from "/utils/block.ts";
import template from "/pages/auth/auth.hbs";
import {SecondaryBtn} from "/components/secondary-btn/script.ts";


interface AuthPageProps {
    secondaryBtn: SecondaryBtn
}

export class AuthPage extends Block {
    props: AuthPageProps;
    constructor(props: AuthPageProps) {
        super("div", props);
    }

    render(){
        return this.compile(template, {"secondary_btn": this.props.secondaryBtn});
    }
}

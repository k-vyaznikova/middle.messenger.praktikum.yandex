import {Block} from "/utils/block.ts";
import template from "/components/secondary_btn/template.hbs";

interface SecondaryBtnProps {
    __href: String,
    __class: String,
    textLink: String
}

export class SecondaryBtn extends Block {
    constructor(props: SecondaryBtnProps) {
        super("a", props);
    }
    render() {
        return this.compile(template, {__href: this.props.__href, __class: this.props.__class, textLink: this.props.textLink});
    }
}



import {Block} from "/utils/block.ts";
import template from "/pages/auth/auth.hbs";
import {form} from "/components/form/script.ts";


interface AuthPageProps {
    form: form
}

export class AuthPage extends Block {
	constructor(props: AuthPageProps) {
		super(props);
	}

	render() {
		return this.compile(template, {"form": this.props.form});
	}
}

/** Хелперы - if с проверкой равенства */
import type {HelperOptions} from 'handlebars';

export default function ifEqual(this: object, a:string, b:string, options:HelperOptions) {
	if (a == b) {
		return options.fn(this);
	}
	return options.inverse(this);
}

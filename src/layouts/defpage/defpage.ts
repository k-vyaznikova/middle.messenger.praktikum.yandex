import type {HelperOptions} from "handlebars";
export default function defpage(this: object, options: HelperOptions): string {
	return `
        <div class = "container ${options.hash.class}">
            ${options.fn(this)}
        </div>
    `;
}

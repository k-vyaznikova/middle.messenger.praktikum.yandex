import type {HelperOptions} from "handlebars";
export default function leftside(this: object, options: HelperOptions): string {
	return `
    <div class = "left-side">
        <div class = "left-side-content">
            ${options.fn(this)}
        </div>
    </div>
    `;
}

import type {HelperOptions} from "handlebars";

export default function cardpage(this: object, options: HelperOptions): string {
	return `
        <div class = "cover-container">
            <div class = "form-module">
                ${options.fn(this)}
            </div>    
        </div>
    `;
}

import type {THelperOptions} from "handlebars";

export default function cardpage(this: object, options: THelperOptions): string {
	return `
        <div class = "cover-container">
            <div class = "form-module">
                ${options.fn(this)}
            </div>    
        </div>
    `;
}

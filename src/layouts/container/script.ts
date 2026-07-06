import type {HelperOptions} from "handlebars";
export default function container(this: object, options: HelperOptions): string {
	console.log(this)
    console.log(options);
    return `
        <div class = "container ${options.hash.class??  ''}">
            ${options.fn(this)}
        </div>
    `;
}


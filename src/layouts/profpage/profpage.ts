import type {HelperOptions} from "handlebars";
export default function profpage(this: object, options: HelperOptions): string {
	return `
        <div class = "container">'
            <a href =  "${options.hash.linkUrl}" class = "back-link"></a>
            <div class = "container-inner">
            ${options.fn(this)}
            </div>
        </div>
    `;
}

import type {THelperOptions} from 'handlebars';
export default function defpage(this: object, options: THelperOptions): string {
	return `
    <div class = "left-side">
        <div class = "left-side-content">
            ${options.fn(this)}
        </div>
    </div>
    `;
}

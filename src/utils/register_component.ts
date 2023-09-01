import Handlebars from "handlebars";
import {HelperOptions} from "handlebars";
import {Block} from "/utils/block.ts";

export function registerComponent(name: string, Component: typeof Block) {
	if (name in Handlebars.helpers) {
		throw new Error(`The ${name} component is already registered!`);
	}

	Handlebars.registerHelper(name, function(this: unknown, {hash, data, fn}: HelperOptions) {
		const component = new Component(hash);
		const dataAttribute = `data-id="${component.id}"`;
		if ("ref" in hash) {
			if (!data.root.__refs) {
				data.root.__refs = [];
			}
			data.root.__refs[hash.ref] = component;
		}
		if (!data.root.__children) {
			data.root.__children = [];
		}
		data.root.__children.push({
			component,
			embed(fragment: DocumentFragment) {
				const plug = fragment.querySelector(`[data-id='${component.id}']`);
				if (!plug) {
					return;
				} else {
					component.getContent()?.append(...Array.from(plug.childNodes));
					plug.replaceWith(component.getContent() as HTMLElement);
				}
			}
		});
		const contents = fn ? fn(this) : "";

		return `<div ${dataAttribute}>${contents}</div>`;
	});
}

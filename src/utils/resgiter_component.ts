import Handlebars from "handlebars";
import {HelperOptions} from "handlebars";
import {Block} from "/utils/block.ts";

export function registerComponent(name: string, Component: Block) {
	console.log(name);
	console.log(Component);
	if (name in Handlebars.helpers) {
		throw `The ${name} component is already registered!`;
	}

	//console.log("__"+name);
	Handlebars.registerHelper(name, function(this: unknown, {hash, data, fn}: HelperOptions) {
		console.log("____"+name);
		console.log("hwewerwer");
		const component = new Component(hash);
		const dataAttribute = `data-id="${component.id}"`;

		/*if ("ref" in hash) {
			(data.root.__refs = data.root.__refs || {})[hash.ref] = component;
		}*/

		if(!data.root.__children)
			data.root.__children = [];
		data.root.__children.push({
			component,
			embed(fragment: DocumentFragment) {
				const stub = fragment.querySelector(`[${dataAttribute}]`);
				if (!stub) {
					return;
				}
				component.getContent()?.append(...Array.from(stub.childNodes));
				stub.replaceWith(component.getContent()!);
			},
		});
		
		const contents = fn ? fn(this) : "";

		return `<div ${dataAttribute}>${contents}</div>`;
	});
}

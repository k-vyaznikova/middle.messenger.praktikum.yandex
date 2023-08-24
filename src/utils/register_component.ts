import Handlebars from "handlebars";
import {HelperOptions} from "handlebars";
import {Block} from "/utils/block.ts";

export function registerComponent(name: string, Component: Block) {
	//console.log(name);
	//console.log(Component);
	if (name in Handlebars.helpers) {
		throw `The ${name} component is already registered!`;
	}

	Handlebars.registerHelper(name, function(this: unknown, {hash, data, fn}: HelperOptions) {
		//console.log("---HASH---");
		//console.log(name);
		//console.log(hash);
		
		const component = new Component(hash);
		//console.log(hash);
		const dataAttribute = `data-id="${component.id}"`;
		if ("ref" in hash) {
			if (!data.root.__refs)
				data.root.__refs = [];
			data.root.__refs[hash.ref] = component;
		}
		if (!data.root.__children)
			data.root.__children = [];
		data.root.__children.push({
			component,
			embed(fragment: DocumentFragment) {
				const plug = fragment.querySelector(`[data-id='${component.id}']`);
				if (!plug) {
					return;
				} else {
					component.getContent()?.append(...Array.from(plug.childNodes));
					plug.replaceWith(component.getContent());
				}
				
			}
		});
		const contents = fn ? fn(this) : "";

		return `<div ${dataAttribute}>${contents}</div>`;
	});
}

import sinon from "sinon";
import {expect, assert} from "chai";
import {Block} from "./../../utils/block.ts";
import {Input} from "./script.ts";
import {InputProps} from "./../../types/common_types.ts";
import {checkError} from "./../../utils/form_utils.ts";
import {TestUtils} from "./../../utils/test_utils.ts";
// import {spyTest} from "./../../utils/test_utils.ts";
// import EventEmitter from "events";
import CustomEvent from "custom-event";

describe("Testing of HTML-structure", () => {
	let defaultInputParams: InputProps;

	beforeEach(() => {
		defaultInputParams = {
			id: "input_id",
			label: "Поле ввода",
			name: "input_name",
			type: "text",
			ref: "input_name",
			error: ""
		};
	});
	it("Component should return tag DIV", () => {
		const input = new Input(defaultInputParams);
		const element = input.element;
		expect(element).to.be.instanceof(window.HTMLDivElement);
	});
	it("Component should return DIV with class input-container", () => {
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.classList.contains("input-container"));
	});
	it("Component should contain LABEL if not-not_empty is set", () => {
		defaultInputParams["not_empty"] = "yes";
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("label") !== null);
	});
	it("Component should contain LABEL if not-not_empty is not set", () => {
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("label") == null);
	});
	it("Input should take label-text from props label", () => {
		defaultInputParams["not_empty"] = "yes";
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("label")?.innerHTML == "Поле ввода");
	});
	it("Input should take value from props name", () => {
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("input")?.getAttribute("name") == "input_name");
	});
	it("Input should take id from props id", () => {
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("input")?.getAttribute("id") == "input_id");
	});
	it("Input should take type from props type", () => {
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("input")?.getAttribute("type") == "text");
	});
	it("Input should take data-validate from props data-validate", () => {
		defaultInputParams["validate_type"] = "not-empty,email";
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("input")?.dataset.validate == defaultInputParams["validate_type"]);
	});
});

describe("Event testing", () => {
	let defaultInputParams: InputProps;
	beforeEach(() => {
		defaultInputParams = {
			id: "input_id",
			label: "Поле ввода",
			name: "input_name",
			type: "text",
			ref: "input_name",
			error: ""
		};
	});


	it("When focus out checkError function is called", () => {
		const spy = sinon.spy(TestUtils, "testCheckError");
		const inputComponent = new Input(defaultInputParams);
		const input = inputComponent.element?.querySelector("input") as HTMLInputElement;
		const event = global.document.createEvent("Event");
		event.initEvent("focusout", true, true);
		input.dispatchEvent(event);
	    assert(spy.calledOnce);
	});
	it("On key up function works", () => {
		const spy = sinon.spy(TestUtils, "testKeyupOnInput");
		const inputComponent = new Input(defaultInputParams);
		const input = inputComponent.element?.querySelector("input") as HTMLInputElement;
		const event = global.document.createEvent("Event");
		event.initEvent("keyup", true, true);
		input.dispatchEvent(event);
	    assert(spy.calledOnce);
	});
});

describe("Testing getters & setters", () => {
	let defaultInputParams: InputProps;
	let input: Input;

	beforeEach(() => {
		defaultInputParams = {
			id: "input_id",
			label: "Поле ввода",
			name: "input_name",
			type: "text",
			ref: "input_name",
			error: "",
			validate_type: "not-empty,email"
		};
		input = new Input(defaultInputParams);
	});
	it("Getter name should return props name", () => {
		expect(input.name).to.eq("input_name");
	});
	it("Getter validate_type should return props validate_type", () => {
		expect(input.validate_type).to.eq("not-empty,email");
	});
	it("Getter value should return value", () => {
		input.element?.querySelector("input")?.setAttribute("value", "значение поля input");
		expect(input.value).to.eq("значение поля input");
	});

	it("Setter value should fill in INPUT tag", () => {
		input.value = "значение поля input";
		expect(input.element?.querySelector("input")?.value).to.eq("значение поля input");
	});
});

describe("Testing methods of parent class Block", () => {
	let defaultInputParams: InputProps;
	let input: Input;

	beforeEach(() => {
		defaultInputParams = {
			id: "input_id",
			label: "Поле ввода",
			name: "input_name",
			type: "text",
			ref: "input_name",
			error: "",
			validate_type: "not-empty,email"
		};
	});
	afterEach(() => {
		sinon.restore();
	});
	it("Testing if render() is called when we create new input", () => {
		const spy = sinon.spy(Input.prototype, "render");
		input = new Input(defaultInputParams);
		assert(spy.calledOnce);
	});
	it("Testing if render() is called when we props are updated", () => {
		input = new Input(defaultInputParams);
		const spy = sinon.spy(input, "render");
		input.setProps({"value": "Новое значение в поле ввода"});
		assert(spy.calledOnce);
	});
	it("Testing if render() is NOT called when the props is an empty object", () => {
		input = new Input(defaultInputParams);
		const spy = sinon.spy(input, "render");
		input.setProps({});
		assert(!spy.called);
	});

	it("Testing if render() returns a DocumentFragment", () => {
		const spy = sinon.spy(Input.prototype, "render");
		input = new Input(defaultInputParams);
		expect(spy.returnValues).to.be.instanceof(window.DocumentFragments);
	});

	it("Testing if componentDidUpdate() is called when the props are updated", () => {
		input = new Input(defaultInputParams);
		const spy = sinon.spy(input, "componentDidUpdate");
		input.setProps({"value": "Новое значение в поле ввода"});
		assert(spy.calledOnce);
	});
	it("Testing if componentDidUpdate() is not called when the props is an empty objectd", () => {
		input = new Input(defaultInputParams);
		const spy = sinon.spy(input, "componentDidUpdate");
		input.setProps({});
		assert(!spy.called);
	});
	it("Testing if props are changed when SetProps is work", () => {
		input = new Input(defaultInputParams);
		input.setProps({
			value: "новое значение input",
			label: "новое поле ввода"
		});
		assert(input.props.value === "новое значение input" && input.props.label === "новое поле ввода");
	});
});

describe("Testing show & hide methods", () => {
	let defaultInputParams: InputProps;
	let input: Input;

	beforeEach(() => {
		defaultInputParams = {
			id: "input_id",
			label: "Поле ввода",
			name: "input_name",
			type: "text",
			ref: "input_name",
			error: "",
			validate_type: "not-empty,email"
		};
		input = new Input(defaultInputParams);
	});
	afterEach(() => {
		sinon.restore();
	});
	it("Testting if hide function", () => {
		input.hide();
		expect(input.element?.style.display).to.eq("none");
	});
	it("Testting of hide function", () => {
		input.hide();
		input.show();
		expect(input.element?.style.display).to.eq("block");
	});
});


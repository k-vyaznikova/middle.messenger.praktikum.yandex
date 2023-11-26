import sinon, {SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest, SinonStub} from "sinon";
import {expect, assert} from "chai";
import HTTPTransport from "./http_transport.ts";

describe("Testing params in requests", () => {
	let instance: HTTPTransport;
	let stubRequest: SinonStub<any>;
	const API_URL = "https://ya-praktikum.tech/api/v2";
	beforeEach(() => {
		instance = new HTTPTransport("");
		stubRequest = sinon.stub(instance, ("request" as keyof typeof instance));
	});

	afterEach(() => {
		sinon.restore();
	});

	it("Check passing parametres from post to request", () => {
		instance.post("/", {id: 12, name: "Tinka"});
		expect(stubRequest.args[0][0]).to.eq(API_URL + "/");
		expect(stubRequest.args[0][1].data.id).to.eq(12);
		expect(stubRequest.args[0][1].data.name).to.eq("Tinka");
		expect(stubRequest.args[0][1].method).to.eq("Post");
	});
	it("Check passing parametres from put to request", () => {
		instance.put("/", {id: 12, name: "Tinka"});
		expect(stubRequest.args[0][0]).to.eq(API_URL + "/");
		expect(stubRequest.args[0][1].data.id).to.eq(12);
		expect(stubRequest.args[0][1].data.name).to.eq("Tinka");
		expect(stubRequest.args[0][1].method).to.eq("Put");
	});
	it("Check passing parametres from patch to request", () => {
		instance.patch("/", {id: 12, name: "Tinka"});
		expect(stubRequest.args[0][0]).to.eq(API_URL + "/");
		expect(stubRequest.args[0][1].data.id).to.eq(12);
		expect(stubRequest.args[0][1].data.name).to.eq("Tinka");
		expect(stubRequest.args[0][1].method).to.eq("Patch");
	});
	it("Check passing parametres from delete to request", () => {
		instance.delete("/", {id: 12, name: "Tinka"});
		expect(stubRequest.args[0][0]).to.eq(API_URL + "/");
		expect(stubRequest.args[0][1].data.id).to.eq(12);
		expect(stubRequest.args[0][1].data.name).to.eq("Tinka");
		expect(stubRequest.args[0][1].method).to.eq("Delete");
	});
	it("Check passing empty parametres from post to request", () => {
		instance.post("/");
		assert(stubRequest.called);
	});
	it("Check passing empty parametres from patch to request", () => {
		instance.patch("/");
		assert(stubRequest.called);
	});
	it("Check passing empty parametres from put to request", () => {
		instance.put("/");
		assert(stubRequest.called);
	});
	it("Check passing empty parametres from delete to request", () => {
		instance.delete("/");
		assert(stubRequest.called);
	});
});

describe("Testing params in get-post-put-patch-delete function", () => {
	let instance: HTTPTransport;
	let stubRequest: SinonStub<any>;
	beforeEach(() => {
		instance = new HTTPTransport("");
		stubRequest = sinon.stub(instance, ("request" as keyof typeof instance));
	});

	afterEach(() => {
		sinon.restore();
	});

	it("The get will fail if the first parameter is not a string", () => {
		instance.get((2 as unknown as string));
		assert(!stubRequest.called);
	});
	it("The post will fail if the first parameter is not a string", () => {
		instance.post((2 as unknown as string), {name: "test"});
		assert(!stubRequest.called);
	});
	it("The put will fail if the first parameter is not a string", () => {
		instance.put((2 as unknown as string));
		assert(!stubRequest.called);
	});
	it("The patch will fail if the first parameter is not a string", () => {
		instance.patch((2 as unknown as string), {name: "test"});
		assert(!stubRequest.called);
	});
	it("The delete will fail if the first parameter is not a string", () => {
		instance.delete((2 as unknown as string), {name: "test"});
		assert(!stubRequest.called);
	});

	it("The post will fail if the second parameter is not an object", () => {
		instance.post("/", 2);
		assert(!stubRequest.called);
	});
	it("The put will fail if the second parameter is not an object", () => {
		instance.put("/", 2);
		assert(!stubRequest.called);
	});
	it("The patch will fail if the second parameter is not an object", () => {
		instance.patch("/", 2);
		assert(!stubRequest.called);
	});
	it("The delete will fail if the second parameter is not an object", () => {
		instance.delete("/", 2);
		assert(!stubRequest.called);
	});
});


describe("Testing request() method", () => {
	let xhr: SinonFakeXMLHttpRequestStatic;
	let instance: HTTPTransport;
	const requests: SinonFakeXMLHttpRequest[] = [];
	beforeEach(() => {
		xhr = sinon.useFakeXMLHttpRequest();

		// @ts-expect-error for testing requests
		global.XMLHttpRequest = xhr;


		xhr.onCreate = (req) => {
			requests.push(req);
		};

		instance = new HTTPTransport("");
	});

	afterEach(() => {
		requests.length = 0;
		xhr.restore();
	});

	it("Method get() should be called with GET method", () => {
		instance.get("/");
		const [request] = requests;
		expect(request.method).to.equal("Get");
	});

	it("Method get return a promise", () => {
		const res = instance.get("/");
		expect(res instanceof Promise).to.equal(true);
	});

	it("Method post() should be called with POST method", () => {
		instance.post("/");
		const [request] = requests;
		expect(request.method).to.equal("Post");
	});
	it("Method put() should be called with PUT method", () => {
		instance.put("/", {});
		const [request] = requests;
		expect(request.method).to.equal("Put");
	});

	it("Method patch() should be called with PATCH method", () => {
		instance.patch("/", {});
		const [request] = requests;
		expect(request.method).to.equal("Patch");
	});

	it("Method delete() should be called with DELETE method", () => {
		instance.delete("/");
		const [request] = requests;
		expect(request.method).to.equal("Delete");
	});
});

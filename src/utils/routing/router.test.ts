console.log(process.env.NODE_PATH);
//console.log("=============");
import {expect} from "chai";
import sinon from "sinon";
//import func from "/test.ts";
import Router from "/utils/routing/router.ts";
import {Block} from "/utils/block.ts";

//console.log(func);



describe("Testing of function use()", () => {
	beforeEach(() => {
		Router.reset();
	});

	const getContentFake1 = sinon.fake.returns(global.window.document.createElement("div"));
	const getContentFake2 = sinon.fake.returns(global.window.document.createElement("div"));


	const BlockMock1 = class {
		getContent = getContentFake1;
	} as unknown as typeof Block;

	const BlockMock2 = class {
		getContent = getContentFake2;
	} as unknown as typeof Block;

	it("Function use() should return Router instance", () => {
		const result = Router.use("/", BlockMock1);
		expect(result).to.eq(Router);
	});
	it("Check length of array _routes", () => {
		Router.use("/", BlockMock1).use("/", BlockMock2);
		expect(Router.routeLength()).to.eq(2);
	});
});



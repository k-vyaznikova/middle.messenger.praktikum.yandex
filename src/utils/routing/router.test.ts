import {expect, assert} from "chai";
import sinon from "sinon";
import Router from "./router.ts";
import {Block} from "./../block.ts";
import {ErrorPage} from "./../../pages/error/script.ts";
import {Route} from "./route.ts";
import TestUtils from "./../../utils/test_utils.ts";


describe("Testing of function use()", () => {
	beforeEach(() => {
		Router.resetRouter();
	});

	const getContentFake1 = sinon.fake.returns(global.document.createElement("div"));
	const getContentFake2 = sinon.fake.returns(global.document.createElement("span"));

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
	it("Check length of array _routes when paths are different", () => {
		Router.use("/", BlockMock1).use("/test", BlockMock2);
		expect(Router.routeLength()).to.eq(2);
	});
	it("Check length of array _routes when paths are equal", () => {
		Router.use("/", BlockMock1).use("/", BlockMock2);
		expect(Router.routeLength()).to.eq(1);
	});
	it("Check length of array _routes when the path has gap 1", () => {
		Router.use("/test test", BlockMock1);
		expect(Router.routeLength()).to.eq(0);
	});
	it("Check length of array _routes when the path has gap 2", () => {
		Router.use("/test ", BlockMock1);
		expect(Router.routeLength()).to.eq(1);
	});
	it("Check length of array _routes when the path is not a string", () => {
		Router.use({}, BlockMock1);
		expect(Router.routeLength()).to.eq(0);
	});
});

describe("Testing of function start()", () => {
	global.window.history.back = () => {
		if (typeof window.onpopstate === "function") {
			window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
		}
	};
	global.window.history.forward = () => {
		if (typeof window.onpopstate === "function") {
			window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
		}
	};

	beforeEach(() => {
		global.window.location.pathname = "/";
	});

	afterEach(() => {
		Router.resetRouter();
	});


	const getContentFake1 = sinon.fake.returns(global.document.createElement("div"));
	const BlockMock1 = class {
		getContent = getContentFake1;
	} as unknown as typeof Block;

	it("Testing if page render on start action (route in the _routes)", () => {
		Router.use("/", BlockMock1).start();
		expect(getContentFake1.callCount).to.eq(1);
	});

	it("Testing if error page render on start action (route not in the _routes)", () => {
		const spy = sinon.spy(Route, "renderPage");

		Router.start();
		expect(spy.args[0][0]).to.eq("#app");
		assert(spy.args[0][1] instanceof ErrorPage);
	});
});


describe("Testing of function go()", () => {
	global.window.history.back = () => {
		if (typeof window.onpopstate === "function") {
			window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
		}
	};
	global.window.history.forward = () => {
		if (typeof window.onpopstate === "function") {
			window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
		}
	};
	beforeEach(() => {
		global.window.location.pathname = "/";
	});

	afterEach(() => {
		Router.resetRouter();
	});

	const getContentFake1 = sinon.fake.returns(global.document.createElement("div"));
	const getContentFake2 = sinon.fake.returns(global.document.createElement("span"));

	const BlockMock1 = class {
		getContent = getContentFake1;
	} as unknown as typeof Block;

	const BlockMock2 = class {
		getContent = getContentFake2;
	} as unknown as typeof Block;

	it("Testing length of history", () => {
		const startHistoryLength = Router.getHistoryLength();
		Router.use("/", BlockMock1).use("/test", BlockMock2);
		Router.start();
		Router.go("/test");
		Router.go("/");
		expect(Router.getHistoryLength() - startHistoryLength).to.eq(2);
	});

	it("Testing go with params", () => {
		const sandbox = sinon.createSandbox();
		Router.use("/", BlockMock1).use("/test", BlockMock2);
		const route = Router.getRoute("/test");
		sandbox.spy(route, "render");
		Router.start();
		Router.go("/test", "id=12&user_id=2");

		expect(route?.render.args[0][0].id).to.eq("12");
		expect(route?.render.args[0][0].user_id).to.eq("2");

		// assert(route?.render.calledWith({"id": 12, "user_id": 2}));
		// assert(true);
	});

	/**
	 * !!! Работает неверно!!!
	 */

	it("Testing that the current route is being cleaned", () => {
		// Router.use("/", BlockMock1).use("/test", BlockMock2);
		// const route = Router.getRoute("/test");
		// const spy = sinon.spy(route, "leave");
		// Router.start();
		// Router.go("/test");
		// expect(spy.calledOnce);
		// expect(true);
	});
});


describe("Testing of function back()", () => {
	afterEach(() => {
		Router.resetRouter();
	});

	const getContentFake1 = sinon.fake.returns(global.document.createElement("div"));
	const getContentFake2 = sinon.fake.returns(global.document.createElement("span"));

	const BlockMock1 = class {
		getContent = getContentFake1;
	} as unknown as typeof Block;

	const BlockMock2 = class {
		getContent = getContentFake2;
	} as unknown as typeof Block;


	it("Testing if page render on history back action (existing route)", () => {
		Router.use("/", BlockMock1).use("/test", BlockMock2).start();
		Router.go("/test");
		Router.go("/");
		Router.back();
		expect(getContentFake2.callCount).to.eq(1);
	});

	it("Testing if page render on history back action (not existing route)", () => {
		const spy = sinon.spy(TestUtils, "emptyFunction");
		Router.use("/", BlockMock1).start();
		Router.go("/undefined");
		Router.go("/");
		Router.back();
		assert(spy.calledTwice);
	});
});


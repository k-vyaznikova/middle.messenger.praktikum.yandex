type Indexed<T = unknown> = {
    [key in string]: T;
  };


export type PlainObject<T = any> = {
    [k in string]: T;
};


function merge(lhs: Indexed, rhs: Indexed): Indexed {
	for (const key in rhs) {
		// if (lhs.hasOwnProperty(key)) {
		if (Object.prototype.hasOwnProperty.call(lhs, key)) {
			if (typeof rhs[key] === "object" && rhs[key] !== null &&
          typeof lhs[key] === "object" && lhs[key] !== null) {
				lhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
			} else
				return Object.assign(lhs as Indexed, rhs as Indexed);
		} else {
			lhs[key] = rhs[key];
		}
	}
	return lhs;
}


export function strToObj(str: string, value: unknown = ""): Indexed {
	let res: Indexed = {};
	let tmp: Indexed = {};
	for (let i = (str.length - 1); i >=0; i--) {
		if (str[i] != ".") {
			res = {};
			if (i === str.length - 1) {
				res[str[i]] = value;
				tmp = res;
			} else {
				res[str[i]] = tmp;
				tmp = res;
			}
		}
	}
	return res;
}

export function isPlainObject(value: unknown): boolean {
	return typeof value === "object" && value !== null && value.constructor === Object && Object.prototype.toString.call(value) === "[object Object]";
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
	if (typeof object !== "object" || object === null) {
		return object;
	}
	if (typeof path !== "string") {
		throw new Error("path must be string");
	}
	const result = path.split(".").reduceRight<Indexed>((acc, key) => ({
		[key]: acc
	}), value as any);
	return merge(object as Indexed, result);
}

function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
	return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}

	for (const [key, value] of Object.entries(lhs)) {
		const rightValue = rhs[key];
		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			if (isEqual(value, rightValue)) {
				continue;
			}
			return false;
		}

		if (value !== rightValue) {
			return false;
		}
	}

	return true;
}



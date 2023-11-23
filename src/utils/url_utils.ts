export function getUrlParams(paramsStr: string): Record<string, string> {
	if (paramsStr.length > 0) {
		const resObj: Record<string, string> = {};
		paramsStr.substring(0).split("&").forEach((item) => {
			const arr: Array<string> = item.split("=");
			if (arr[0])
				resObj[arr[0]] = arr[1]? arr[1] : "";
		});
		return resObj;
	}
	return {};
}

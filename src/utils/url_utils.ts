export function getUrlParams(): Record<string, string>{
    const paramsStr: string = window.location.search;
    if(paramsStr.length > 0 && paramsStr.indexOf("?") > -1){
        const resObj: Record<string, string> = {}
        paramsStr.substring(1).split("&").forEach((item, index) => {
            const arr: Array<string> = item.split("=");
            if(arr[0])
                resObj[arr[0]] = arr[1]? arr[1] : "";
        });
        return resObj;
    }
    return {};
}
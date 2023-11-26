export function formattedTime(time: string) {
	const date: Date = new Date(time);
	const hours = date.getHours().toString().length == 2? date.getHours() : "0"+date.getHours().toString();
	const minutes = date.getMinutes().toString().length == 2? date.getMinutes() : "0"+date.getMinutes().toString();
	return hours+":"+minutes;
}

export function formattedDate(time: string) {
	const date: Date = new Date(time);
	const arrTextMonth: Array<string> = [
		"января",
		"февраля",
		"марта",
		"апреля",
		"мая",
		"июня",
		"июля",
		"августа",
		"сентября",
		"октября",
		"ноября",
		"декабря"
	];
	return date.getDate() +" "+ arrTextMonth[date.getMonth()];
}

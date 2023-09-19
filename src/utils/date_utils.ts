export function formattedTime(time: string) {
	const date: Date = new Date(time);
	return date.getHours()+":"+date.getMinutes();
}

export function formattedDate(time: string) {
	const date: Date = new Date(time);
	return date.getDay()+" "+date.getMonth();
}

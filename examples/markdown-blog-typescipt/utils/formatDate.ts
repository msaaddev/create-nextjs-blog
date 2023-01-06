export default function formatDate(date: string): string {
	const newDate: Date = new Date(date);
	const day: number = newDate.getDate();
	const month: number = newDate.getMonth();
	const year: number = newDate.getFullYear();

	const monthName = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	return `${monthName[month]} ${day}, ${year}`;
}

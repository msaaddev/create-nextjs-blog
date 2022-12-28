export default function formatDate(date) {
	const newDate = new Date(date);
	const day = newDate.getDate();
	const month = newDate.getMonth();
	const year = newDate.getFullYear();

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

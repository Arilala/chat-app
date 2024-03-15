export function extractTime(dateString) {
	let date = new Date();
	if(dateString){
			date = new Date(dateString);
	}
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}
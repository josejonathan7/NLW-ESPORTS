

export function convertHoursToMinutes(hoursString: string) {

	const [hours, minutes] = hoursString.split(":").map(Number);

	const minutesAmounts = (hours*60) + minutes;

	return minutesAmounts;
}

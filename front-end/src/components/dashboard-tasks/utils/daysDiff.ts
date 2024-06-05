/**
 * Calculates the difference in days between the given ISO date and the current date.
 *
 * @param {string | null} ISODate - The ISO date string or null.
 * @returns {number | null} The difference in days, or null if the input date is null.
 */
export const daysDiff = (ISODate: string | null) => {
	if (ISODate === null) return null;

	const targetDate = new Date(ISODate);
	const currentDate = new Date();

	const millisDiff = targetDate.getTime() - currentDate.getTime();
	const oneDayMillis = 24 * 60 * 60 * 1000;

	return Math.ceil(millisDiff / oneDayMillis);
};

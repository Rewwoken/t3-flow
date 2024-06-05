export const daysDiff = (ISODate: string | null) => {
	if (ISODate === null) return null;

	const millisDiff = new Date(ISODate).getTime() - Date.now();

	const oneDayMillis = 24 * 60 * 60 * 1000;

	return Math.ceil(millisDiff / oneDayMillis);
};

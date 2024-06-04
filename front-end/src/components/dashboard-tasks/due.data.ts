const oneDayMillis = 24 * 60 * 60 * 1000;

export const due = {
	overdue: new Date(Date.now() - oneDayMillis).toISOString(),
	'no-date': null,
};

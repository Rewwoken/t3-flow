const oneDayMillis = 24 * 60 * 60 * 1000;

export const due: Record<
	'overdue' | 'noDate' | 'today' | 'tomorrow' | 'thisWeek' | 'later' | string,
	string | null
> = {
	overdue: new Date(Date.now() - oneDayMillis).toISOString(),
	noDate: null,
	today: new Date().toISOString(),
	tomorrow: new Date(Date.now() + oneDayMillis).toISOString(),
	thisWeek: new Date(Date.now() + 2 * oneDayMillis).toISOString(),
	later: new Date(Date.now() + 8 * oneDayMillis).toISOString(),
};

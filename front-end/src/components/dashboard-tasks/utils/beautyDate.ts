const dtf = new Intl.DateTimeFormat('en', {
	dateStyle: 'full',
	year: undefined,
});

export const beautyDate = (date: Date) => {
	const formatted = dtf.format(date);

	return formatted.slice(0, -6);
};

export const MaterialTheme = () => {
	const [mounted, setMounted] = React.useState(false);
	const { resolvedTheme, setTheme } = React.useTheme();

	React.useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<Skeleton
				className={className}
				style={{ width: size, height: size }}
			/>
		);
	}
};

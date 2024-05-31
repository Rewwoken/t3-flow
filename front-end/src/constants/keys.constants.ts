class Keys {
	readonly QUERY_USER = ['user'];
	readonly QUERY_TIMER_SETTINGS = ['timer', 'settings'];
	readonly QUERY_TASKS = ['tasks'];

	readonly MUTATE_AUTH = ['auth'];
	readonly MUTATE_SETTINGS = ['update', 'settings'];
	readonly MUTATE_TASK = ['update', 'task'];
}

export const KEYS = new Keys();

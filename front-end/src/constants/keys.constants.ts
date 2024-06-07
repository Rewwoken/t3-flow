class Keys {
	readonly GET_USER = ['user'];
	readonly GET_TIMER_SETTINGS = ['timer', 'settings'];
	readonly GET_TASKS = ['tasks'];

	readonly AUTH = ['auth'];
	readonly UPDATE_SETTINGS = ['update', 'settings'];
	readonly UPDATE_TASK = ['update', 'task'];
	readonly CREATE_TASK = ['create', 'task'];
	readonly DELETE_TASK = ['delete', 'task'];
	readonly REORDER = ['reorder'];
}

export const KEYS = new Keys();

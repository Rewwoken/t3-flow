class Keys {
	readonly GET_USER = ['user'];
	readonly GET_TIMER_SETTINGS = ['timer', 'settings'];
	readonly GET_TASKS = ['tasks'];
	readonly GET_TASK_GROUPS = ['tasks', 'group'];

	readonly AUTH = ['auth'];
	readonly UPDATE_SETTINGS = ['update', 'settings'];
	readonly UPDATE_TASK = ['update', 'task'];
	readonly CREATE_TASK = ['create', 'task'];
	readonly DELETE_TASK = ['delete', 'task'];
}

export const KEYS = new Keys();

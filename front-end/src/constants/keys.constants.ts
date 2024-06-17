class Keys {
	readonly AUTH = ['auth'];

	readonly GET_USER = ['user'];
	readonly UPDATE_USER = ['user', 'update'];

	readonly GET_TASKS = ['tasks'];
	readonly CREATE_TASK = ['task', 'create'];
	readonly UPDATE_TASK = ['task', 'update'];
	readonly DELETE_TASK = ['task', 'delete'];

	readonly CREATE_TIMER_SESSION = ['timer', 'session', 'create'];
	readonly GET_TIMER_SESSION = ['timer', 'session'];
	readonly UPDATE_TIMER_SESSION = ['timer', 'session', 'update'];
	readonly GET_TIMER_SETTINGS = ['timer', 'settings'];
	readonly DELETE_TIMER_SESSION = ['timer', 'session', 'delete'];

	readonly UPDATE_SETTINGS = ['update', 'settings'];
}

export const KEYS = new Keys();

class Keys {
  readonly AUTH = ['auth'];

  readonly USER_GET = ['user'];
  readonly USER_GET_PROFILE = ['user', 'profile'];
  readonly USER_UPDATE = ['user', 'update'];

  readonly TASK_GET_ALL = ['tasks'];
  readonly TASK_CREATE = ['task', 'create'];
  readonly TASK_UPDATE = ['task', 'update'];
  readonly TASK_DELETE = ['task', 'delete'];

  readonly TIMER_SESSION_CREATE = ['timer', 'session', 'create'];
  readonly TIMER_SESSION_GET = ['timer', 'session'];
  readonly TIMER_SESSION_UPDATE = ['timer', 'session', 'update'];

  readonly TIMER_SETTINGS_GET = ['timer', 'settings'];
  readonly TIMER_SETTINGS_DELETE = ['timer', 'session', 'delete'];

  readonly TIME_BLOCK_GET_ALL = ['time', 'blocks'];
  readonly TIME_BLOCK_UPDATE = ['time', 'block', 'update'];
  readonly TIME_BLOCK_CREATE = ['time', 'block', 'create'];
  readonly TIME_BLOCK_DELETE = ['time', 'block', 'delete'];

  readonly SETTINGS_UPDATE = ['update', 'settings'];
}

export const KEYS = new Keys();

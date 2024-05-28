class Dashboard {
	readonly BASE_URL = '/dashboard';

	readonly ROOT = `${this.BASE_URL}`;
	readonly TASKS = `${this.BASE_URL}/tasks`;
	readonly TIMER = `${this.BASE_URL}/timer`;
	readonly TIME_BLOCKING = `${this.BASE_URL}/time-blocking`;
	readonly SETTINGS = `${this.BASE_URL}/settings`;
}

export const DASHBOARD = new Dashboard();

class Auth {
	readonly BASE_URL = '/auth';

	readonly REGISTER = `${this.BASE_URL}/register`;
	readonly LOGIN = `${this.BASE_URL}/login`;
}

export const AUTH = new Auth();

class Dashboard {
	readonly BASE_URL = '/dashboard';

	readonly HOME = `${this.BASE_URL}/home`;
}

export const DASHBOARD = new Dashboard();

class Auth {
	readonly BASE_URL = '/auth';

	readonly REGISTER = `${this.BASE_URL}/register`;
	readonly LOGIN = `${this.BASE_URL}/login`;
}

export const AUTH = new Auth();

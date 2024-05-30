import { apiProtected } from '@/api/interceptors';
import type {
	IGetUserResponse,
	IUpdateUser,
	IUpdateUserResponse,
} from '@/types/services.types';

export class UserService {
	private readonly BASE_URL = '/user';

	async getUser() {
		const result = await apiProtected.get<IGetUserResponse>(this.BASE_URL);

		return result.data;
	}

	async update(updateUser: IUpdateUser) {
		const result = await apiProtected.patch<IUpdateUserResponse>(
			this.BASE_URL,
			updateUser,
		);

		return result.data;
	}
}

export const userService = new UserService();

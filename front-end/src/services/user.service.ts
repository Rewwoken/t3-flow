import { apiProtected } from '@/api/interceptors';
import type {
	IGetProfileResponse,
	IUpdateUser,
	IUpdateUserResponse,
} from '@/types/services.types';

export class UserService {
	async getProfile() {
		const { data } = await apiProtected.get<IGetProfileResponse>('/user');

		return data;
	}

	async update(updateUser: IUpdateUser) {
		const { data } = await apiProtected.patch<IUpdateUserResponse>('/user', updateUser);

		return data;
	}
}

export const userService = new UserService();

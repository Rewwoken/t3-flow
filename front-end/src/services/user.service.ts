import { apiProtected } from '@/api/interceptors';
import type {
  IGetProfileResponse,
  IGetUserResponse,
  IUpdateUser,
  IUpdateUserResponse,
} from '@/types/user.service.types';

class UserService {
  private readonly BASE_URL = '/user';

  async getProfile() {
    const result = await apiProtected.get<IGetProfileResponse>(
      `${this.BASE_URL}/profile`,
    );

    return result.data;
  }

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

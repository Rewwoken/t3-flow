import { apiProtected } from '@/api/interceptors';
import { IUpdateTimerSettingsFields } from '@/types/settings.types';
import type {
  IGetTimerSessionResponse,
  IGetTimerSettingsResponse,
  IUpdateTimerSession,
  IUpdateTimerSettingsResponse,
} from '@/types/timer.service.types';

class TimerService {
  private readonly BASE_URL = '/timer';

  async createSession() {
    const result = await apiProtected.post<IGetTimerSessionResponse>(
      `${this.BASE_URL}/session`,
    );

    return result.data;
  }

  async getSession() {
    const result = await apiProtected.get<IGetTimerSessionResponse>(
      `${this.BASE_URL}/session`,
    );

    return result.data;
  }

  async updateSession(data: IUpdateTimerSession) {
    const result = await apiProtected.patch<IGetTimerSessionResponse>(
      `${this.BASE_URL}/session`,
      data,
    );

    return result.data;
  }

  async deleteSession() {
    const result = await apiProtected.delete<void>(`${this.BASE_URL}/session`);

    return result.data;
  }

  async getSettings() {
    const result = await apiProtected.get<IGetTimerSettingsResponse>(
      `${this.BASE_URL}/settings`,
    );

    return result.data;
  }

  async updateSettings(data: IUpdateTimerSettingsFields) {
    const result = await apiProtected.patch<IUpdateTimerSettingsResponse>(
      `${this.BASE_URL}/settings`,
      data,
    );

    return result.data;
  }
}

export const timerService = new TimerService();

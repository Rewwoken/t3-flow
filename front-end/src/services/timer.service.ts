import { apiProtected } from '@/api/interceptors';
import type {
	IGetTimerSettingsResponse,
	IUpdateTimerSettings,
	IUpdateTimerSettingsResponse,
} from '@/types/services.types';

export class TimerService {
	private readonly BASE_URL = '/timer';

	async getSettings() {
		const result = await apiProtected.get<IGetTimerSettingsResponse>(
			this.BASE_URL,
		);

		return result.data;
	}

	async updateSettings(data: IUpdateTimerSettings) {
		const result = await apiProtected.patch<IUpdateTimerSettingsResponse>(
			this.BASE_URL,
			data,
		);

		return result.data;
	}
}

export const timerService = new TimerService();

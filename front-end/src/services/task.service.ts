import { apiProtected } from '@/api/interceptors';
import type {
	ICreateTaskData,
	ICreateTaskDataResponse,
	IGetTaskResponse,
	IGetTasksResponse,
	IUpdateTaskResponse,
} from '@/types/task.service';

export class TaskService {
	private readonly BASE_URL = '/task';

	async create(data: ICreateTaskData) {
		const result = await apiProtected.post<ICreateTaskDataResponse>(
			this.BASE_URL,
			data,
		);

		return result.data;
	}

	async getAll() {
		const result = await apiProtected.get<IGetTasksResponse>(this.BASE_URL);

		return result.data;
	}

	async getOne(id: string) {
		const result = await apiProtected.get<IGetTaskResponse>(
			`${this.BASE_URL}/${id}`,
		);

		return result.data;
	}

	async update(id: string, data: any) {
		const result = await apiProtected.patch<IUpdateTaskResponse>(
			`${this.BASE_URL}/${id}`,
			data,
		);

		return result.data;
	}
}

export const taskService = new TaskService();

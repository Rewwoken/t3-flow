import { apiProtected } from '@/api/interceptors';
import type {
	ICreateTaskData,
	ICreateTaskDataResponse,
	IGetTaskResponse,
	IGetTasksResponse,
	IReorderData,
	IUpdateTaskResponse,
} from '@/types/task.service';

export class TaskService {
	private readonly BASE_URL = '/task';

	async create(data: ICreateTaskData) {
		const result = await apiProtected.post<ICreateTaskDataResponse>(
			this.BASE_URL,
			{ ...data, rank: null },
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

	async delete(id: string) {
		const result = await apiProtected.delete<void>(`${this.BASE_URL}/${id}`);

		return result.data;
	}

	async reorder({ id, ...body }: IReorderData) {
		const result = await apiProtected.patch<void>(
			`${this.BASE_URL}/reorder/${id}`,
			body,
		);

		return result.data;
	}
}

export const taskService = new TaskService();

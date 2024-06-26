import { PrismaService } from '@/prisma.service';
import { CreateTaskDto } from '@/task/dto/create-task-dto';
import { UpdateTaskDto } from '@/task/dto/update-task.dto';
import { Injectable } from '@nestjs/common';
import {
	addDays,
	addWeeks,
	isBefore,
	isToday,
	isTomorrow,
	nextSunday,
	startOfToday,
} from 'date-fns';

@Injectable()
export class TaskService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll(userId: string, group: boolean | undefined) {
		const tasks = await this.prismaService.task.findMany({
			where: { userId },
			orderBy: { rank: 'asc' }, // ! Must be ordered by lexorank ascending
		});

		// TODO: implement rebalance

		if (!group) return tasks;

		const groups: Record<string, typeof tasks> = {
			completed: [],
			noDate: [],
			overdue: [],
			today: [],
			tomorrow: [],
			theseTwoWeeks: [],
			later: [],
		};

		for (const task of tasks) {
			const groupKey = this.getGroupKey(task);

			groups[groupKey].push(task);
		}

		return groups;
	}

	private getGroupKey(task: { isCompleted: boolean; dueDate: Date | null }) {
		const now = startOfToday();

		if (task.isCompleted) return 'completed';

		if (task.dueDate === null) return 'noDate';

		if (isToday(task.dueDate)) return 'today';

		if (isBefore(task.dueDate, now)) return 'overdue';

		if (isTomorrow(task.dueDate)) return 'tomorrow';

		if (isBefore(task.dueDate, addDays(addWeeks(nextSunday(now), 1), 1)))
			return 'theseTwoWeeks';

		return 'later';
	}

	async create(userId: string, createTaskDto: CreateTaskDto) {
		return await this.prismaService.task.create({
			data: {
				...createTaskDto,
				user: {
					connect: { id: userId },
				},
			},
		});
	}

	async update(userId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
		return await this.prismaService.task.update({
			where: { userId: userId, id: taskId },
			data: updateTaskDto,
		});
	}

	async delete(userId: string, taskId: string) {
		return await this.prismaService.task.delete({
			where: { userId: userId, id: taskId },
		});
	}
}

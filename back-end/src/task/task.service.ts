import { PrismaService } from '@/prisma.service';
import { CreateTaskDto } from '@/task/dto/create-task-dto';
import { UpdateTaskDto } from '@/task/dto/update-task.dto';
import { Injectable } from '@nestjs/common';
import {
	endOfWeek,
	isAfter,
	isBefore,
	isThisWeek,
	isToday,
	isTomorrow,
} from 'date-fns';

@Injectable()
export class TaskService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll(userId: string, group: boolean | undefined) {
		const result = await this.prismaService.task.findMany({
			where: { userId: userId },
		});

		if (!group) return result;

		const now = new Date();

		const groups = {
			completed: [],
			noDate: [],
			overdue: [],
			today: [],
			tomorrow: [],
			thisWeek: [],
			later: [],
		};

		for (const task of result) {
			switch (true) {
				case task.isCompleted:
					groups.completed.push(task);
					break;
				case task.dueDate === null:
					groups.noDate.push(task);
					break;
				case isToday(task.dueDate):
					groups.today.push(task);
					break;
				case isTomorrow(task.dueDate):
					groups.tomorrow.push(task);
					break;
				// ! Check if the date is overdue before thisWeek
				// ! since the task can be this week but overdue
				case isBefore(task.dueDate, now):
					groups.overdue.push(task);
					break;
				// Set `weekStartsOn: 1` to be Monday as week start
				case isThisWeek(task.dueDate, { weekStartsOn: 1 }):
					groups.thisWeek.push(task);
					break;
				case isAfter(task.dueDate, endOfWeek(now, { weekStartsOn: 1 })):
					groups.later.push(task);
					break;
				default:
					groups.noDate.push(task);
					break;
			}
		}

		for (const key in groups) {
			groups[key] = groups[key].sort((a, b) => {
				if (a.rank === null) {
					return 1;
				}

				if (b.rank === null) {
					return -1;
				}

				return a.rank.localeCompare(b.rank);
			});
		}

		return groups;
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
			where: { id: taskId, userId: userId },
		});
	}
}

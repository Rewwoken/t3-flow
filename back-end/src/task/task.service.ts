import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll(userId: string) {
		return await this.prismaService.task.findMany({
			where: { userId: userId },
		});
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

import { PrismaService } from '@/prisma.service';
import { CreateTaskDto } from '@/task/dto/create-task-dto';
import { UpdateTaskDto } from '@/task/dto/update-task.dto';
import { Injectable } from '@nestjs/common';
import { LexoRank } from 'lexorank';
import { ReorderTaskDto } from './dto/reorder.dto';

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
				rank: null,
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

	async reorder(
		userId: string,
		taskId: string,
		{ data, prevRank, nextRank }: ReorderTaskDto,
	) {
		let rank = null;

		// handle dropping to empty column case
		if (prevRank === null && nextRank === null) {
			rank = LexoRank.middle();
		}

		// handle dropping as the first in the column
		if (prevRank === null && nextRank !== null) {
			// if(LexoRank.parse(prevRank).isMin())

			rank = LexoRank.min().between(LexoRank.parse(nextRank));
		}

		// handle dropping as the last in the column
		if (prevRank !== null && nextRank === null) {
			// if (LexoRank.parse(prevRank).isMax())

			rank = LexoRank.parse(prevRank).between(LexoRank.max());
		}

		// handle dropping between other tasks
		if (prevRank !== null && nextRank !== null) {
			rank = LexoRank.parse(prevRank).between(LexoRank.parse(nextRank));
		}

		return await this.prismaService.task.update({
			where: { userId: userId, id: taskId },
			data: { ...data, rank: rank.toString() },
		});
	}
}

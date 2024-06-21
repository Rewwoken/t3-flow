import { PrismaService } from '@/prisma.service';
import { CreateTimeBlockDto } from '@/time-block/dto/create-time-block.dto';
import { UpdateTimeBlockDto } from '@/time-block/dto/update-time-block.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeBlockService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll(userId: string) {
		return await this.prismaService.timeBlock.findMany({
			where: {
				userId: userId,
			},
			orderBy: {
				rank: 'asc',
			},
		});
	}

	async create(userId: string, createTimeBlockDto: CreateTimeBlockDto) {
		return await this.prismaService.timeBlock.create({
			data: {
				...createTimeBlockDto,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});
	}

	async update(
		userId: string,
		timeBlockId: string,
		updateTimeBlockDto: UpdateTimeBlockDto,
	) {
		return await this.prismaService.timeBlock.update({
			where: {
				userId: userId,
				id: timeBlockId,
			},
			data: updateTimeBlockDto,
		});
	}

	async delete(userId: string, timeBlockId) {
		return await this.prismaService.timeBlock.delete({
			where: {
				userId: userId,
				id: timeBlockId,
			},
		});
	}
}

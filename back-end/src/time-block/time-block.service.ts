import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { UpdateTimeBlockDto } from './dto/update-time-block.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class TimeBlockService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll(userId: string) {
		return await this.prismaService.timeBlock.findMany({
			where: {
				userId: userId,
			},
			orderBy: {
				order: 'asc',
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

	async update(userId: string, timeBlockId: string, updateTimeBlockDto: UpdateTimeBlockDto) {
		return await this.prismaService.timeBlock.update({
			where: {
				id: timeBlockId,
				userId: userId, // just for the safety; can be removed
			},
			data: updateTimeBlockDto,
		});
	}

	async delete(userId: string, timeBlockId) {
		return await this.prismaService.timeBlock.delete({
			where: {
				id: timeBlockId,
				userId: userId, // just for the safety; can be removed
			},
		});
	}

	async updateOrder(userId: string, updateOrderDto: UpdateOrderDto) {
		return this.prismaService.$transaction(
			updateOrderDto.ids.map((id, index) =>
				this.prismaService.timeBlock.update({
					where: {
						id: id,
						userId: userId, // just for the safety; can be removed
					},
					data: { order: index },
				}),
			),
		);
	}
}

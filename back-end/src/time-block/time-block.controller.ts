import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Protected } from 'src/auth/decorators/protected.decorator';
import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateTimeBlockDto } from './dto/update-time-block.dto';
import { TimeBlockService } from './time-block.service';

@Protected()
@Controller('time-block')
export class TimeBlockController {
	constructor(private readonly timeBlockService: TimeBlockService) {}

	@Get()
	async getAll(@CurrentUser('id') userId: string) {
		return await this.timeBlockService.getAll(userId);
	}

	@Post()
	async create(@CurrentUser('id') userId: string, @Body() createTimeBlockDto: CreateTimeBlockDto) {
		return await this.timeBlockService.create(userId, createTimeBlockDto);
	}

	@Patch('/:timeBlockId')
	async update(
		@CurrentUser('id') userId: string,
		@Param('timeBlockId') timeBlockId: string,
		@Body()
		updateTimeBlockDto: UpdateTimeBlockDto,
	) {
		return await this.timeBlockService.update(userId, timeBlockId, updateTimeBlockDto);
	}

	@Post('/reorder')
	@HttpCode(200)
	async updateOrder(@CurrentUser('id') userId: string, @Body() updateOrderDto: UpdateOrderDto) {
		return await this.timeBlockService.updateOrder(userId, updateOrderDto);
	}

	@Delete('/:timeBlockId')
	async delete(@CurrentUser('id') userId: string, @Param('timeBlockId') timeBlockId: string) {
		return await this.timeBlockService.delete(userId, timeBlockId);
	}
}

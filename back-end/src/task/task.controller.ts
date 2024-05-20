import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Protected } from 'src/auth/decorators/protected.decorator';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Protected()
@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get()
	async getAll(@CurrentUser('id') userId: string) {
		return await this.taskService.getAll(userId);
	}

	@Post()
	async create(@CurrentUser('id') userId: string, @Body() createTaskDto: CreateTaskDto) {
		return await this.taskService.create(userId, createTaskDto);
	}

	@Patch('/:taskId')
	async update(
		@CurrentUser('id') userId: string,
		@Param('taskId') taskId: string,
		@Body() updateTaskDto: UpdateTaskDto,
	) {
		return await this.taskService.update(userId, taskId, updateTaskDto);
	}

	@Delete('/:taskId')
	async delete(@Param('taskId') taskId: string) {
		return await this.taskService.delete(taskId);
	}
}

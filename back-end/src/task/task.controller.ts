import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Protected } from 'src/auth/decorators/protected.decorator';
import { TaskService } from './task.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Protected()
@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}
	
	@Get()
	async getAll(@CurrentUser('id') userId: string) {
		return this.taskService.getAll(userId);
	}

	@Post()
	async create(@CurrentUser('id') userId: string, @Body() createTaskDto: CreateTaskDto) {
		return this.taskService.create(userId, createTaskDto);
	}

	@Patch('/:taskId')
	async update(
		@CurrentUser('id') userId: string,
		@Param('taskId') taskId: string,
		@Body() updateTaskDto: UpdateTaskDto,
	) {
		return this.taskService.update(userId, taskId, updateTaskDto);
	}

	@Delete('/:taskId')
	async delete(@Param('taskId') taskId: string) {
		return this.taskService.delete(taskId);
	}
}

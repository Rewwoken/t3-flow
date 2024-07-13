import { CreateTaskDto } from '@/task/dto/create-task-dto';
import { UpdateTaskDto } from '@/task/dto/update-task.dto';
import { TaskService } from '@/task/task.service';
import { CurrentUser } from '@/token/decorators/current-user.decorator';
import { Protected } from '@/token/decorators/protected.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Protected()
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll(
    @CurrentUser('id') userId: string,
    @Query('group', new ParseBoolPipe({ optional: true }))
    group: boolean | undefined,
  ) {
    return await this.taskService.getAll(userId, group);
  }

  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
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
  async delete(
    @CurrentUser('id') userId: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.taskService.delete(userId, taskId);
  }
}

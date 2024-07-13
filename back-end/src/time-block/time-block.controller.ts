import { CreateTimeBlockDto } from '@/time-block/dto/create-time-block.dto';
import { UpdateTimeBlockDto } from '@/time-block/dto/update-time-block.dto';
import { TimeBlockService } from '@/time-block/time-block.service';
import { CurrentUser } from '@/token/decorators/current-user.decorator';
import { Protected } from '@/token/decorators/protected.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Protected()
@Controller('time-block')
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}

  @Get()
  async getAll(@CurrentUser('id') userId: string) {
    return await this.timeBlockService.getAll(userId);
  }

  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() createTimeBlockDto: CreateTimeBlockDto,
  ) {
    return await this.timeBlockService.create(userId, createTimeBlockDto);
  }

  @Patch('/:timeBlockId')
  async update(
    @CurrentUser('id') userId: string,
    @Param('timeBlockId') timeBlockId: string,
    @Body()
    updateTimeBlockDto: UpdateTimeBlockDto,
  ) {
    return await this.timeBlockService.update(
      userId,
      timeBlockId,
      updateTimeBlockDto,
    );
  }

  @Delete('/:timeBlockId')
  async delete(
    @CurrentUser('id') userId: string,
    @Param('timeBlockId') timeBlockId: string,
  ) {
    return await this.timeBlockService.delete(userId, timeBlockId);
  }
}

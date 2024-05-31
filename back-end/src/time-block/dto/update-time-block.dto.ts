import { CreateTimeBlockDto } from '@/time-block/dto/create-time-block.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTimeBlockDto extends PartialType(CreateTimeBlockDto) {}

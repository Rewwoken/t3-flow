import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Priority } from 'prisma/generated/client';

export class CreateTaskDto {
  @IsString()
  @MinLength(1, {
    message: 'Task name must be at least 1 character!',
  })
  @MaxLength(30, {
    message: 'Task name must be less than 30 characters!',
  })
  name: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsString()
  rank: string;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;
}

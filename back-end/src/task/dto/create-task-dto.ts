import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority } from 'prisma/generated/client';

export class CreateTaskDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsEnum(Priority)
	priority?: Priority;
}

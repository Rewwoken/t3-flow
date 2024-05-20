import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority } from 'prisma/generated/client';

export class UpdateTaskDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsBoolean()
	isCompleted?: boolean;

	@IsOptional()
	@IsEnum(Priority)
	priority?: Priority;
}

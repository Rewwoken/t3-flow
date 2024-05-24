import { IsBoolean, IsOptional } from 'class-validator';

export class CreateTimerSessionDto {
	@IsOptional()
	@IsBoolean()
	isCompleted: boolean;
}

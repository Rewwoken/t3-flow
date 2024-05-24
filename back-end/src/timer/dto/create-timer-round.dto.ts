import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateTimerRoundDto {
	@IsNumber()
	totalSeconds: number;

	@IsOptional()
	@IsBoolean()
	isCompleted: boolean;
}

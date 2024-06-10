import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTimeBlockDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	color?: string; // TODO: change string to enum

	@IsNumber()
	duration: number;

	@IsString()
	rank: string;
}

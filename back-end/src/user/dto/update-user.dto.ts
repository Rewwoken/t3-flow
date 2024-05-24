import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { PomodoroSettingsDto } from './pomodoro-settings.dto';

// TODO: extend from RegisterDto
export class UpdateUserDto extends PomodoroSettingsDto {
	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	@MaxLength(15, { message: 'Name should be less than 15 characters.' })
	name?: string;

	@IsOptional()
	@IsString()
	@MinLength(6, { message: 'Password must be at least 6 characters!' })
	@MaxLength(30, { message: 'Password must be less than 30 characters!' })
	password?: string;
}

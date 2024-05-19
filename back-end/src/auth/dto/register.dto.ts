import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
	@IsEmail()
	email: string;

	@IsString()
	@IsOptional()
	@MaxLength(15, { message: 'Name should be less than 15 characters.' })
	name: string;

	@IsString()
	@MinLength(6, { message: 'Password must be at least 6 characters!' })
	@MaxLength(30, { message: 'Password must be less than 30 characters!' })
	password: string;
}

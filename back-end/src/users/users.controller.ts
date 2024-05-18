import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post('/')
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get('/:email')
	async getOneByEmail(@Param('email') email: string) {
		const result = await this.usersService.findOneByEmail(email);

		if (!result) {
			throw new NotFoundException('User does not exist!');
		}

		const { password, ...user } = result;

		return user;
	}
}

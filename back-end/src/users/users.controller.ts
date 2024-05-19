import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

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

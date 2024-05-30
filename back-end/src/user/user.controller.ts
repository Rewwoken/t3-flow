import { Body, Controller, Get, Patch } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Protected } from 'src/auth/decorators/protected.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@Protected()
	async profile(@CurrentUser('id') id: string) {
		return await this.userService.getProfile(id);
	}

	@Patch()
	@Protected()
	async update(
		@CurrentUser('id') id: string,
		@CurrentUser('email') email: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return await this.userService.update(id, email, updateUserDto);
	}
}

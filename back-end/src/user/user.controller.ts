import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { Protected } from '@/auth/decorators/protected.decorator';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { UserService } from '@/user/user.service';
import { Body, Controller, Get, Patch } from '@nestjs/common';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@Protected()
	async getUser(@CurrentUser('id') id: string) {
		return await this.userService.getUser(id);
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

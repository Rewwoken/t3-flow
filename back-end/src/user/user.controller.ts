import { CurrentUser } from '@/token/decorators/current-user.decorator';
import { Protected } from '@/token/decorators/protected.decorator';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { UserService } from '@/user/user.service';
import { Body, Controller, Get, Patch } from '@nestjs/common';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('/profile')
	@Protected()
	async getProfile(@CurrentUser('id') id: string) {
		const { password, ...profile } = await this.userService.getProfile(id);

		return profile;
	}

	@Get()
	@Protected()
	async getUser(@CurrentUser('id') id: string) {
		const { password, ...user } = await this.userService.findOneById(id);

		return user;
	}

	@Patch()
	@Protected()
	async update(
		@CurrentUser('id') id: string,
		@CurrentUser('email') email: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		const { password, ...user } = await this.userService.update(
			id,
			email,
			updateUserDto,
		);

		return user;
	}
}

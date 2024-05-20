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
		return this.userService.getProfile(id);
	}

	@Patch()
	@Protected()
	async updateProfile(@CurrentUser('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}
}

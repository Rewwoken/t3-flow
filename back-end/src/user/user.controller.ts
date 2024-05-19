import { Body, Controller, Get, HttpCode, NotFoundException, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	// @Get('/:id')
	// async getOneById(@Param('id') id: string) {
	// 	const result = await this.userService.findOneById(id);

	// 	if (!result) {
	// 		throw new NotFoundException('User does not exist!');
	// 	}

	// 	const { password, ...user } = result;

	// 	return user;
	// }

	@Get()
	@UseGuards(JwtAuthGuard)
	async profile(@CurrentUser('id') id: string) {
		return this.userService.getProfile(id);
	}

	@Patch()
	@UseGuards(JwtAuthGuard)
	async updateProfile(@CurrentUser('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}
}

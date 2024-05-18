import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/login')
	@UseGuards(LocalAuthGuard)
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	// route just for test
	@UseGuards(JwtAuthGuard)
	@Get('/profile')
	getProfile(@Request() req) {
		return req.user;
	}
}

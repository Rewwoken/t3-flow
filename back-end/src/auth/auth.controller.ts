import { Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokenService } from 'src/token/token.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly tokenService: TokenService,
	) {}

	@Post('/register')
	async register(
		@Body() registerDto: RegisterDto,
		// !!! `passthrough: true` allows to set the cookie
		@Res({ passthrough: true }) res: Response,
	) {
		const { refreshToken, ...response } = await this.authService.register(registerDto);

		this.tokenService.addRefreshTokenToResponse(res, refreshToken);

		return response;
	}

	@Post('/login')
	@HttpCode(200)
	async login(
		@Body() loginDto: LoginDto,
		// !!! `passthrough: true` allows to manipulate the response
		@Res({ passthrough: true }) res: Response,
	) {
		const { refreshToken, ...response } = await this.authService.login(loginDto);

		this.tokenService.addRefreshTokenToResponse(res, refreshToken);

		return response;
	}

	@Post('/logout')
	@HttpCode(200)
	async logout(
		// !!! `passthrough: true` allows to manipulate the response
		@Res({ passthrough: true }) res: Response,
	) {
		this.tokenService.removeRefreshTokenFromResponse(res);
	}

	@Get('/access-token')
	async getNewTokens(
		@Req() req: Request,
		// !!! `passthrough: true` allows to manipulate the response
		@Res({ passthrough: true }) res: Response,
	) {
		const refreshTokenFromCookies = req.cookies[this.tokenService.REFRESH_TOKEN_NAME];

		if (!refreshTokenFromCookies) {
			this.tokenService.removeRefreshTokenFromResponse(res);

			throw new UnauthorizedException('Refresh token not passed!');
		}

		const { refreshToken, ...response } = await this.tokenService.getNewTokens(refreshTokenFromCookies);

		this.tokenService.addRefreshTokenToResponse(res, refreshToken);

		return response;
	}
}

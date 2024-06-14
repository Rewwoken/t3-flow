import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/dto/login.dto';
import { RegisterDto } from '@/auth/dto/register.dto';
import { TokenService } from '@/token/token.service';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	Res,
	UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly tokenService: TokenService,
	) {}

	@Post('/register')
	async register(
		@Body() registerDto: RegisterDto,
		// use { passthrough: true } to manipulate the cookies
		@Res({ passthrough: true }) res: Response,
	) {
		const { refreshToken, ...response } =
			await this.authService.register(registerDto);

		this.tokenService.addRefreshTokenToResponse(res, refreshToken);

		return response;
	}

	@Post('/login')
	@HttpCode(200)
	async login(
		@Body() loginDto: LoginDto,
		// use { passthrough: true } to manipulate the cookies
		@Res({ passthrough: true }) res: Response,
	) {
		const { refreshToken, ...response } =
			await this.authService.login(loginDto);

		this.tokenService.addRefreshTokenToResponse(res, refreshToken);

		return response;
	}

	@Post('/logout')
	@HttpCode(200)
	async logout(
		// use { passthrough: true } to manipulate the cookies
		@Res({ passthrough: true }) res: Response,
	) {
		return this.tokenService.clearTokensCookies(res);
	}

	@Get('/access-token')
	async getNewTokens(
		@Req() req: Request,
		// use { passthrough: true } to manipulate the cookies
		@Res({ passthrough: true }) res: Response,
	) {
		const refreshTokenFromCookies =
			req.cookies[this.tokenService.REFRESH_TOKEN_NAME];

		if (!refreshTokenFromCookies) {
			this.tokenService.clearTokensCookies(res);

			throw new UnauthorizedException('Refresh token not passed!');
		}

		const { refreshToken, ...response } = await this.tokenService.getNewTokens(
			refreshTokenFromCookies,
		);

		this.tokenService.addRefreshTokenToResponse(res, refreshToken);

		return response;
	}
}

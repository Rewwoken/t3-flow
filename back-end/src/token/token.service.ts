import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenService {
	readonly REFRESH_TOKEN_NAME = 'refreshToken';
	private readonly REFRESH_TOKEN_EXPIRES = 1;
	private readonly REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
		httpOnly: true,
		domain: process.env.DOMAIN,
		secure: true,
		sameSite: 'none', // 'lax' in production
	};

	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	issueTokens(userId: string) {
		const data = { id: userId };

		const accessToken = this.jwtService.sign(data, {
			expiresIn: '1h',
		});

		const refreshToken = this.jwtService.sign(data, {
			expiresIn: '7d',
		});

		return { accessToken, refreshToken };
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date();
		expiresIn.setDate(expiresIn.getDate() + this.REFRESH_TOKEN_EXPIRES);

		// set the refreshToken httpOnly cookie
		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			...this.REFRESH_TOKEN_COOKIE_OPTIONS,
			expires: expiresIn,
		});
	}

	removeRefreshTokenFromResponse(res: Response) {
		// to remove the cookie, we can make it ivalid by
		// setting the cookie value to '' and expiration date to 1970y
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			...this.REFRESH_TOKEN_COOKIE_OPTIONS,
			expires: new Date(0),
		});
	}

	async getNewTokens(refreshToken: string) {
		try {
			const result = await this.jwtService.verifyAsync(refreshToken);

			const { password, ...user } = await this.usersService.findOneById(result.id);

			const newTokens = await this.issueTokens(user.id);

			return {
				...user,
				...newTokens,
			};
		} catch (err) {
			// catch an error in verifyAsync
			throw new UnauthorizedException('Invalid refresh token!');
		}
	}
}

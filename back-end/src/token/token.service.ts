import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenService {
	readonly EXPIRE_DAY_REFRESH_TOKEN = 1;
	readonly REFRESH_TOKEN_NAME = 'refreshToken';

	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	generateTokens(userId: string) {
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
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: process.env.DOMAIN,
			expires: expiresIn,
			secure: true,
			sameSite: 'none', // 'lax' in production
		});
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, 'NULL', {
			httpOnly: true,
			domain: process.env.DOMAIN,
			expires: new Date(0),
			secure: true,
			sameSite: 'none', // 'lax' in production
		});
	}

	async getNewTokens(refreshToken: string) {
		try {
			const result = await this.jwtService.verifyAsync(refreshToken);

			const { password, ...user } = await this.usersService.findOneById(result.id);

			const { refreshToken: newRefreshToken, accessToken: newAccessToken } = await this.generateTokens(user.id);

			return {
				...user,
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			};
		} catch (err) {
			throw new UnauthorizedException('Invalid refresh token!');
		}
	}
}

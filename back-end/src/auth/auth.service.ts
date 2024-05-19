import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
	readonly EXPIRE_DAY_REFRESH_TOKEN = 1;
	readonly REFRESH_TOKEN_NAME = 'refreshToken';

	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async register(registerDto: RegisterDto) {
		const { name, email, password } = registerDto;

		const existingUser = await this.usersService.findOneByEmail(email);

		if (existingUser) {
			throw new BadRequestException('Email is already in use!');
		}

		const { password: pass, ...user } = await this.usersService.create({
			name,
			email,
			password,
		});

		const { refreshToken, accessToken } = this.generateTokens(user.id);

		return { ...user, refreshToken, accessToken };
	}

	async login(loginDto: LoginDto) {
		const { email, password: pass } = loginDto;

		const findUser = await this.usersService.findOneByEmail(email);

		if (!findUser) {
			throw new UnauthorizedException('Invalid email or password!');
		}

		const isValid = await argon2.verify(findUser.password, pass);

		if (!isValid) {
			throw new UnauthorizedException('Invalid email or password!');
		}

		const { password, ...user } = findUser;

		const { refreshToken, accessToken } = this.generateTokens(user.id);

		return { ...user, refreshToken, accessToken };
	}

	private generateTokens(userId: string) {
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

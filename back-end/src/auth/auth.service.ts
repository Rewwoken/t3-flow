import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly tokenService: TokenService,
	) {}

	async register(registerDto: RegisterDto) {
		const existingUser = await this.usersService.findOneByEmail(registerDto.email);

		if (existingUser) {
			throw new BadRequestException('Email is already in use!');
		}

		const { password, ...user } = await this.usersService.create(registerDto);

		const { accessToken, refreshToken } = this.tokenService.issueTokens(user.id);

		return { ...user, accessToken, refreshToken };
	}

	async login(loginDto: LoginDto) {
		const findUser = await this.usersService.findOneByEmail(loginDto.email);

		if (!findUser) {
			throw new UnauthorizedException('Invalid email or password!');
		}

		const isValid = await argon2.verify(findUser.password, loginDto.password);

		if (!isValid) {
			throw new UnauthorizedException('Invalid email or password!');
		}

		const { password, ...user } = findUser;

		const { accessToken, refreshToken } = this.tokenService.issueTokens(user.id);

		return { ...user, accessToken, refreshToken };
	}
}

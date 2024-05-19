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

		const { refreshToken, accessToken } = this.tokenService.generateTokens(user.id);

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

		const { refreshToken, accessToken } = this.tokenService.generateTokens(user.id);

		return { ...user, refreshToken, accessToken };
	}
}

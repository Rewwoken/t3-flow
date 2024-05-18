import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User } from 'prisma/generated/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string) {
		const findUser = await this.usersService.findOneByEmail(email);

		if (!findUser) {
			throw new UnauthorizedException('Invalid email or password!');
		}

		const isValid = await argon2.verify(findUser.password, pass);

		if (!isValid) {
			throw new UnauthorizedException('Invalid email or password!');
		}

		const { password, ...user } = findUser;

		return user;
	}

	async login(user: Omit<User, 'password'>) {
		const payload = { sub: user.id, email: user.email };

		return { access_token: this.jwtService.sign(payload) };
	}
}

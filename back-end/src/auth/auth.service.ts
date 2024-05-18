import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	async validate(email: string, pass: string) {
		const findUser = await this.usersService.findOneByEmail(email);

		if (!findUser) {
			throw new UnauthorizedException('Invalid email or password!');
		}

		const isValid = await argon2.verify(findUser.password, pass);

		if (!isValid) {
			throw new UnauthorizedException('Invalid email or password!');
		}

		const { password, ...user } = findUser;

		// TODO: create jwt and return it

		return user;
	}
}

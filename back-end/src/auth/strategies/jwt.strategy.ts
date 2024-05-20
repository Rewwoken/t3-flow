// https://docs.nestjs.com/recipes/passport#implementing-passport-jwt
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { JwtToken } from 'src/token/interface/jwt-token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	/**
	 * For the jwt-strategy, Passport first verifies the JWT's signature and decodes the JSON.
	 * It then invokes our validate() method passing the decoded JSON as its single parameter.
	 * Based on the way JWT signing works, we're guaranteed that we're receiving a valid token
	 * that we have previously signed and issued to a valid user.
	 *
	 * Passport will build a user object based on the return value of our validate() method,
	 * and attach it as a property on the Request object.
	 */
	async validate(token: JwtToken) {
		const findUser = await this.userService.findOneById(token.id);

		if (!findUser) {
			throw new UnauthorizedException();
		}

		const { password, ...user } = findUser;

		return user;
	}
}

// https://docs.nestjs.com/recipes/passport#implementing-passport-jwt
import { EnvironmentVaribales } from '@/config/configuration';
import { IJwtToken } from '@/token/interface/jwt-token.interface';
import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService<EnvironmentVaribales>,
		private readonly userService: UserService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('jwtSecret'),
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
	async validate(token: IJwtToken) {
		const findUser = await this.userService.findOneById(token.id);

		if (!findUser) {
			throw new UnauthorizedException('Invalid access token!');
		}

		const { password, ...user } = findUser;

		return user;
	}
}

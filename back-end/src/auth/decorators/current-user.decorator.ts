import {
	ExecutionContext,
	InternalServerErrorException,
	createParamDecorator,
} from '@nestjs/common';
import { User } from 'prisma/generated/client';

/**
 * HTTP route param decorator
 *
 * Accepts current `user` object key and returns
 * the specified value from req.user.
 *
 * Must be used after `@Protected` decorator,
 * otherwise throws an exception, since there
 * will be no user object without `@Protected`
 * decorator.
 */
export const CurrentUser = createParamDecorator(
	(key: keyof Omit<User, 'password'>, context: ExecutionContext) => {
		const req = context.switchToHttp().getRequest();
		const user = req.user;

		// throw an exception if @CurrentUser() was used without @Protected
		if (!user) {
			throw new InternalServerErrorException('No user object!');
		}

		// if the key is provided, return the specified property
		// otherwise, return the whole user object
		return key ? user[key] : user;
	},
);

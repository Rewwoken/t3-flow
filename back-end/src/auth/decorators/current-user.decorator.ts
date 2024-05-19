import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'prisma/generated/client';

/**
 * TODO: docs...
 */
export const CurrentUser = createParamDecorator((key: keyof Omit<User, 'password'>, context: ExecutionContext) => {
	const req = context.switchToHttp().getRequest();
	const user = req.user;

	// if the key is not provided, return whole user object
	// otherwise, return the specified property
	return key ? user[key] : user;
});

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';

/**
 * Method or Class decorator
 *
 * Determines whether a given request will be handled by the
 * route handler or not, depending on a Bearer token validation.
 *
 * When `@Protected` is used at the controller level, the validation
 * will be applied to every handler (method) in the controller.
 *
 * When `@Protected` is used at the individual handler level, the
 * validation will be applid only to that specific method.
 */
export const Protected = () => UseGuards(JwtAuthGuard);

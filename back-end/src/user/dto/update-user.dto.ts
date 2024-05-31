import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from '@/auth/dto/register.dto';

// TODO: extend from RegisterDto
export class UpdateUserDto extends PartialType(RegisterDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from 'src/auth/dto/register.dto';

// TODO: extend from RegisterDto
export class UpdateUserDto extends PartialType(RegisterDto) {}

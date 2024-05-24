import { PartialType } from '@nestjs/mapped-types';
import { CreateTimerSessionDto } from './create-timer-session.dto';

export class UpdateSessionDto extends PartialType(CreateTimerSessionDto) {}

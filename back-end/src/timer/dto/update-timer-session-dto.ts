import { CreateTimerSessionDto } from '@/timer/dto/create-timer-session.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSessionDto extends PartialType(CreateTimerSessionDto) {}

import { CreateTimerRoundDto } from '@/timer/dto/create-timer-round.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTimerRoundDto extends PartialType(CreateTimerRoundDto) {}

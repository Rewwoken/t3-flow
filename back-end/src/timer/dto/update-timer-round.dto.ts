import { PartialType } from '@nestjs/mapped-types';
import { CreateTimerRoundDto } from './create-timer-round.dto';

export class UpdateTimerRoundDto extends PartialType(CreateTimerRoundDto) {}

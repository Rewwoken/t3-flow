import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task-dto';

export class ReorderTaskDto {
	data: typeof PartialType<CreateTaskDto>;
	prevRank: string | null;
	nextRank: string | null;
}

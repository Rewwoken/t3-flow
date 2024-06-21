import type { ICreateTimeBlockData } from '@/types/time-block.service.types';

export interface ICreateTimeBlockFields
	extends Omit<ICreateTimeBlockData, 'rank'> {}

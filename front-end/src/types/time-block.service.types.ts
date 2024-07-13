import type { IBase } from '@/types/api.types';

export interface ITimeBlock extends IBase {
  name: string;
  color: string;
  minutes: number;
  rank: string;
  userId: string;
}

export interface ICreateTimeBlockData {
  name: string;
  color: string;
  minutes: number;
  rank: string;
}

export interface ICreateTimeBlockResponse extends ITimeBlock {}

export interface IGetTimeBlocksResponse extends Array<ITimeBlock> {}

export interface IUpdateTimeBlockData {
  id: string;
  data: Partial<Omit<ITimeBlock, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;
}

export interface IUpdateTimeBlockResponse extends ITimeBlock {}

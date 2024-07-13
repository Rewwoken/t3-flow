import { apiProtected } from '@/api/interceptors';
import type {
  ICreateTimeBlockData,
  ICreateTimeBlockResponse,
  IGetTimeBlocksResponse,
  IUpdateTimeBlockData,
  IUpdateTimeBlockResponse,
} from '@/types/time-block.service.types';

class TimeBlockService {
  private readonly BASE_URL = '/time-block';

  async getAll() {
    const result = await apiProtected.get<IGetTimeBlocksResponse>(
      this.BASE_URL,
    );

    return result.data;
  }

  async createOne(data: ICreateTimeBlockData) {
    const result = await apiProtected.post<ICreateTimeBlockResponse>(
      this.BASE_URL,
      data,
    );

    return result.data;
  }

  async updateOne({ id, data }: IUpdateTimeBlockData) {
    const result = await apiProtected.patch<IUpdateTimeBlockResponse>(
      `${this.BASE_URL}/${id}`,
      data,
    );

    return result.data;
  }

  async deleteOne(id: string) {
    const result = await apiProtected.delete<void>(`${this.BASE_URL}/${id}`);

    return result.data;
  }
}

export const timeBlockService = new TimeBlockService();

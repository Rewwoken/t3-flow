import type { AxiosError } from 'axios';

export interface IBase {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IApiErrorResponse
  extends AxiosError<{
    message?: string;
    error: string;
    statusCode: number;
  }> {}

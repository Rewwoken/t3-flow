import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateSessionDto {
  @IsNumber()
  @IsOptional()
  seconds: number;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;
}

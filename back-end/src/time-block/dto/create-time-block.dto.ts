import {
  IsNumber,
  IsRgbColor,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTimeBlockDto {
  @IsString()
  @MinLength(1, {
    message: 'Time block name must be at least 1 character!',
  })
  @MaxLength(40, {
    message: 'Time block name must be less than 40 characters!',
  })
  name: string;

  @IsNumber()
  @Min(5, {
    message: 'Time block duration should be greater than 5 minutes!',
  })
  @Max(720, {
    message: 'Time block duration should be less than 720 minutes!',
  })
  minutes: number;

  @IsRgbColor()
  color: string;

  @IsString()
  rank: string;
}

import { IsNumberString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class IProducts {
  @IsNumberString()
  @IsOptional()
  @Transform(value => value || 1, { toClassOnly: true })
  page: number;

  @IsNumberString()
  @IsOptional()
  limit: number;

  @IsNumberString()
  @IsOptional()
  description_length: number;
}
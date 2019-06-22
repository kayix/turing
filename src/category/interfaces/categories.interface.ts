import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class ICategories {
  @IsOptional()
  @IsString()
  @IsIn(['category_id', 'name'])
  order: string;

  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  limit: number;
}

import { IProducts } from './products.interface';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ISearch extends IProducts {
  @IsString()
  @IsNotEmpty()
  readonly query_string: string;

  @IsString()
  @IsOptional()
  readonly all_words: string;
}

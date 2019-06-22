import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class IProductReviewsParams {
  @IsNotEmpty()
  @IsNumberString()
  product_id: number;
}

export class IProductReviewsBody {
  @IsNotEmpty()
  @IsString()
  review: string;

  @IsNotEmpty()
  @IsNumberString()
  rating: number;
}

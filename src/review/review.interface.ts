export interface ICreateReview {
  readonly customer_id: number;
  readonly product_id: number;
  readonly review: string;
  readonly rating: number;
  readonly created_on: string;
}

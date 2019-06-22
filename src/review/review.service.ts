import { Inject, Injectable } from '@nestjs/common';
import { Review } from './review.entity';
import TYPES from '../constants';

@Injectable()
export class ReviewService {
  constructor(
    @Inject(TYPES.REVIEW_REPOSITORY)
    private readonly reviewRepository: typeof Review,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.findAll();
  }

  async findById(id): Promise<Review> {
    return this.reviewRepository.findOne({ where: { review_id: id } });
  }
}

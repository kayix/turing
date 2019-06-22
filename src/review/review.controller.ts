import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review.entity';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Get('/')
  getAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Review> {
    const item = await this.reviewService.findById(params.id);
    if (!item) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return item;
  }
}

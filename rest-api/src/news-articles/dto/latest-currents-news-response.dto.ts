import { IsString } from 'class-validator';
import { HttpStatus } from '@nestjs/common';

export class LatestCurrentsAPINewsResponseDTO {
  readonly statusCode: HttpStatus;

  @IsString()
  readonly message: string;

  @IsString()
  readonly data: NewsArticleCount;

  constructor(
    statusCode: HttpStatus,
    message: string,
    data?: NewsArticleCount,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

interface NewsArticleCount {
  insertedNewArticles: number;
}

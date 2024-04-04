import { IsString } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import { NewsArticle } from '../entities/news-article.entity';

export class FetchNewsArticleResponseDTO {
  readonly statusCode: HttpStatus;

  @IsString()
  readonly message: string;

  @IsString()
  readonly data: NewsArticle[];

  readonly totalPages: number;

  constructor(
    statusCode: HttpStatus,
    message: string,
    totalPages?: number,
    data?: NewsArticle[],
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.totalPages = totalPages;
    this.data = data;
  }
}

import { IsString } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import { NewsArticle } from '../entities/news-article.entity';

export class CreateNewsArticleResponseDTO {
  readonly statusCode: HttpStatus;

  @IsString()
  readonly message: string;

  @IsString()
  readonly data: NewsArticle;

  constructor(statusCode: HttpStatus, message: string, data?: NewsArticle) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

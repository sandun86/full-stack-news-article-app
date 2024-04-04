import { Module } from '@nestjs/common';
import { NewsArticlesService } from './services/news-articles.service';
import { NewsArticlesController } from './controllers/news-articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsArticle } from './entities/news-article.entity';
import { CurrentsAPIService } from './services/currents-api.service';
import { CurrentAPIHelper } from './helpers/currentAPI.helper';

@Module({
  imports: [TypeOrmModule.forFeature([NewsArticle])],
  controllers: [NewsArticlesController],
  providers: [NewsArticlesService, CurrentsAPIService, CurrentAPIHelper],
})
export class NewsArticlesModule {}

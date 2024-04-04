import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CurrentAPIHelper } from '../helpers/currentAPI.helper';
import { NewsArticlesService } from './news-articles.service';
import { NewsArticle } from '../entities/news-article.entity';
import { CreateNewsArticleDto } from '../dto/create-news-article.dto';
import { LatestCurrentsAPINewsResponseDTO } from '../dto/latest-currents-news-response.dto';
import { stringify } from 'querystring';

@Injectable()
export class CurrentsAPIService {
  private readonly logger: Logger;

  /**
   * Constructor
   * @param currentAPIHelper
   * @param newsArticleService
   */
  constructor(
    private readonly currentAPIHelper: CurrentAPIHelper,
    private readonly newsArticleService: NewsArticlesService,
  ) {
    this.logger = new Logger('clock-service');
  }

  /**
   * Fetch and save the latest news articles
   * @param uuid
   * @returns
   */
  async fetchAndSaveLatestNews(
    uuid: string,
  ): Promise<LatestCurrentsAPINewsResponseDTO> {
    try {
      this.logger.log(
        `Currents API service: fetchAndSaveLatestNews, start, uuid: ${uuid} `,
      );
      const latestNews = await this.currentAPIHelper.getLatestNews(uuid);
      this.logger.log(
        `Currents API service: fetchAndSaveLatestNews, fetched data from API, uuid: ${uuid} `,
      );
      let insertedNewArticles: number = 0;
      for (const news of latestNews) {
        this.logger.log(
          `Currents API service: findCurrentsArticle, uuid: ${uuid}, currents_api_article_id: ${news.id} `,
        );
        const currentsArticle: NewsArticle =
          await this.newsArticleService.findCurrentsArticle(news.id);
        if (!currentsArticle) {
          this.logger.log(
            `Currents API service: create, uuid: ${uuid}, currents_api_article_id: ${news.id} `,
          );
          const newsArticle: CreateNewsArticleDto = {
            currents_api_article_id: news.id,
            title: news.title,
            content: news.description,
            publication_date: new Date(news.published),
            url: news.url,
            author: news.author,
            image_url: news.image,
            language: news.language,
            category: news.category.toString(),
          };
          await this.newsArticleService.create(newsArticle, news.id);
          this.logger.log(
            `Currents API service: created, uuid: ${uuid}, currents_api_article_id: ${news.id} `,
          );
          insertedNewArticles++;
        }
      }
      return new LatestCurrentsAPINewsResponseDTO(
        HttpStatus.CREATED,
        'Currents latest articles successfully saved.!',
        { insertedNewArticles },
      );
    } catch (error) {
      this.logger.error(
        `News articles service: create, ${uuid}, error: ${error.message} `,
      );
      return new LatestCurrentsAPINewsResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Please try again later',
      );
    }
  }
}

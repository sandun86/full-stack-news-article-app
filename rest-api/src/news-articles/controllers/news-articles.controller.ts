import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  Headers,
  Query,
} from '@nestjs/common';
import { CurrentsAPIService } from '../services/currents-api.service';
import { NewsArticlesService } from '../services/news-articles.service';
import { CreateNewsArticleDto } from '../dto/create-news-article.dto';
import { CreateNewsArticleResponseDTO } from '../dto/create-news-article-response.dto';
import { FetchNewsArticleResponseDTO } from '../dto/fetch-news-article-response.dto';

@Controller('news-articles')
export class NewsArticlesController {
  private readonly logger: Logger;

  /**
   * Constructor
   * @param newsArticlesService
   * @param currentsAPIService
   */
  constructor(
    private readonly newsArticlesService: NewsArticlesService,
    private readonly currentsAPIService: CurrentsAPIService,
  ) {
    this.logger = new Logger('clock-service');
  }

  /**
   * Create news articles
   * @param createNewsArticleDto
   * @param header
   * @returns CreateNewsArticleResponseDTO
   */
  @Post()
  async create(
    @Body() createNewsArticleDto: CreateNewsArticleDto,
    @Headers() header: string,
  ): Promise<CreateNewsArticleResponseDTO> {
    this.logger.log(`News articles controller: create, ${header['uuid']} `);
    const createdNewsArticle = await this.newsArticlesService.create(
      createNewsArticleDto,
      header['uuid'],
    );
    return createdNewsArticle;
  }

  /**
   * FindAll
   * @param header
   * @param page
   * @returns FetchNewsArticleResponseDTO
   */
  @Get()
  async findAll(
    @Headers() header: string,
    @Query('page') page: number,
  ): Promise<FetchNewsArticleResponseDTO> {
    this.logger.log(
      `News articles controller: findAll, start, ${header['uuid']} `,
    );
    const articles = await this.newsArticlesService.findAll(
      page,
      header['uuid'],
    );
    this.logger.log(
      `News articles controller, findAll, succeed, ${header['uuid']} `,
    );
    return articles;
  }

  /**
   * StoreCurrentsApiNews
   * @param header
   * @returns
   */
  @Post('store-currents-api-news')
  async storeCurrentsApiNews(@Headers() header: string) {
    const newInsertedArticlesCount =
      await this.currentsAPIService.fetchAndSaveLatestNews(header['uuid']);
    return newInsertedArticlesCount;
  }
}

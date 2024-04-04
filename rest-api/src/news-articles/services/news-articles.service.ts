import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { NewsArticle } from '../entities/news-article.entity';
import { CreateNewsArticleDto } from '../dto/create-news-article.dto';
import { FetchNewsArticleResponseDTO } from '../dto/fetch-news-article-response.dto';
import { CreateNewsArticleResponseDTO } from '../dto/create-news-article-response.dto';

@Injectable()
export class NewsArticlesService {
  private readonly logger: Logger;

  /**
   * constructor
   * @param newsArticleRepository
   */
  constructor(
    @InjectRepository(NewsArticle)
    private readonly newsArticleRepository: Repository<NewsArticle>,
  ) {
    this.logger = new Logger('clock-service');
  }

  /**
   * Create News articles
   * @param createNewsArticleDto
   * @param uuid
   * @returns
   */
  async create(
    createNewsArticleDto: CreateNewsArticleDto,
    uuid: string,
  ): Promise<CreateNewsArticleResponseDTO> {
    try {
      this.logger.log(`News articles service: create, start, uuid:${uuid} `);
      const article = this.newsArticleRepository.create(createNewsArticleDto);
      const newsArticle: NewsArticle =
        await this.newsArticleRepository.save(article);
      this.logger.log(`News articles service: create, succeed, uuid:${uuid} `);
      return new CreateNewsArticleResponseDTO(
        HttpStatus.CREATED,
        'Article has saved successfully.!',
        newsArticle,
      );
    } catch (error) {
      this.logger.error(
        `News articles service: create, ${uuid}, error: ${error.message} `,
      );
      return new CreateNewsArticleResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Please try again later',
      );
    }
  }

  /**
   * FindAll NewsArticles
   * @param page
   * @param uuid
   * @returns
   */
  async findAll(
    page: number,
    uuid: string,
  ): Promise<FetchNewsArticleResponseDTO> {
    try {
      this.logger.log(`News articles service: findAll, start, uuid: ${uuid} `);
      const skip = (page - 1) * 10;
      const newsArticles: NewsArticle[] = await this.newsArticleRepository.find(
        {
          take: 10,
          skip,
        },
      );
      const allNewsArticles: NewsArticle[] =
        await this.newsArticleRepository.find();
      const totalPages = Math.ceil(allNewsArticles.length / 10);

      this.logger.log(
        `News articles service: findAll, succeed, uuid: ${uuid} `,
      );
      return new FetchNewsArticleResponseDTO(
        HttpStatus.OK,
        'Article has fetched successfully.!',
        totalPages,
        newsArticles,
      );
    } catch (error) {
      this.logger.error(
        `News articles service: findAll, uuid: ${uuid}, error: ${error.message} `,
      );
      return new FetchNewsArticleResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Please try again later',
      );
    }
  }

  /**
   * FindCurrentsArticle
   * @param currents_api_article_id
   * @returns
   */
  findCurrentsArticle(
    currents_api_article_id: string,
  ): Promise<NewsArticle | null> {
    try {
      this.logger.log(
        `News articles service: findCurrentsArticle, start, currents_api_article_id: ${currents_api_article_id} `,
      );
      const currentsArticle = this.newsArticleRepository.findOneBy({
        currents_api_article_id,
      });
      this.logger.log(
        `News articles service: findCurrentsArticle, succeed, currents_api_article_id: ${currents_api_article_id} `,
      );
      return currentsArticle;
    } catch (error) {
      this.logger.error(
        `News articles service: findCurrentsArticle, currents_api_article_id: ${currents_api_article_id}, error: ${error.message} `,
      );
      return null;
    }
  }
}

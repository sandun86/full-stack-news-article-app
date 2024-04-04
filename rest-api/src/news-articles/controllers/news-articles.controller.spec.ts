import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NewsArticlesController } from './news-articles.controller';
import { NewsArticle } from '../entities/news-article.entity';
import { CurrentAPIHelper } from '../helpers/currentAPI.helper';
import { CurrentsAPIService } from '../services/currents-api.service';
import { NewsArticlesService } from '../services/news-articles.service';
import { CreateNewsArticleDto } from '../dto/create-news-article.dto';
import { FetchNewsArticleResponseDTO } from '../dto/fetch-news-article-response.dto';

/**
 * Test - NewsArticlesController
 */
describe('NewsArticlesController', () => {
  let newArticleController: NewsArticlesController;

  const mockNewsArticleService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: NewsArticlesService,
      useFactory: () => ({
        save: jest.fn(() => []),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsArticlesController],
      providers: [
        ApiServiceProvider,
        CurrentsAPIService,
        CurrentAPIHelper,
        {
          provide: NewsArticlesService,
          useValue: mockNewsArticleService,
        },
      ],
    }).compile();

    newArticleController = module.get<NewsArticlesController>(
      NewsArticlesController,
    );
  });

  it('should be defined', () => {
    expect(newArticleController).toBeDefined();
  });

  it('should create a news article', async () => {
    const createdNewsArticle: NewsArticle = {
      id: 1,
      title: 'New News Article',
      content: 'New News Article',
      publication_date: new Date('2024-02-13'),
    };

    jest
      .spyOn(mockNewsArticleService, 'create')
      .mockReturnValue(createdNewsArticle);

    const createNewsArticleDto: CreateNewsArticleDto = {
      title: 'New News Article',
      content: 'New News Article',
      publication_date: new Date('2024-02-13'),
    };
    const result = await newArticleController.create(
      createNewsArticleDto,
      'uuid',
    );

    expect(result).toBe(createdNewsArticle);
  });

  it('should find-all a news articles', async () => {
    const response = new FetchNewsArticleResponseDTO(
      HttpStatus.OK,
      'Article has fetched successfully.!',
      10,
      [
        {
          id: 1,
          title: 'New News Article',
          content: 'New News Article',
          publication_date: new Date('2024-02-13'),
        },
      ],
    );

    jest.spyOn(mockNewsArticleService, 'findAll').mockReturnValue(response);

    const result = await newArticleController.findAll('uuid', 1);

    expect(result.statusCode).toBe(HttpStatus.OK);
  });
});

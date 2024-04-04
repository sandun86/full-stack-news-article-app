import { Logger } from '@nestjs/common';
import { CurrentsAPIDto } from '../dto/currents-api-news.dto';
const CURRENTS_API_KEY = process.env.CURRENTS_API_KEY;
const CurrentsAPI = require('currentsapi');

/**
 * CurrentAPIHelper
 */
export class CurrentAPIHelper {
  private readonly logger: Logger;

  /**
   * constructor
   */
  constructor() {
    this.logger = new Logger('clock-service');
  }

  /**
   * GetLatestNews
   * @param uuid
   * @returns
   */
  async getLatestNews(uuid: string): Promise<CurrentsAPIDto[] | []> {
    try {
      this.logger.log(`CurrentAPIHelper: getLatestNews, start, uuid: ${uuid} `);
      const currentsAPI = new CurrentsAPI(CURRENTS_API_KEY);
      const articles = await currentsAPI.latestNews();
      if (articles.status === 'ok') {
        this.logger.log(
          `CurrentAPIHelper: getLatestNews, fetched, uuid: ${uuid} `,
        );
        return articles.news;
      }
      return [];
    } catch (err) {
      this.logger.error(
        `CurrentAPIHelper: getLatestNews, uuid: ${uuid}, error: ${err.message}`,
      );
      return [];
    }
  }
}

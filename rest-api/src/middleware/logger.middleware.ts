import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * Logger Middleware - authentication the request by API-KEY
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger: Logger;
  constructor() {
    this.logger = new Logger('clock-service');
  }
  use(req: Request, res: Response, next: NextFunction) {
    const { headers, ip, method, originalUrl } = req;
    if (headers['x-api-key'] === process.env.API_KEY) {
      req.headers.uuid = uuidv4();
      this.logger.log(`Requested by ${req.headers.uuid} `);
      next();
    } else {
      this.logger.error(
        `Unauthorized request from originalUrl: ${originalUrl}, method: ${method}, ip: ${ip}`,
      );
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}

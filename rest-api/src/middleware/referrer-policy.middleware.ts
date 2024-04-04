import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ReferrerPolicyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set the Referrer-Policy header to strict-origin-when-cross-origin
    console.log('CROSS');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  }
}

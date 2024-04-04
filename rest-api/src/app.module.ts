import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { NewsArticlesModule } from './news-articles/news-articles.module';
import { ReferrerPolicyMiddleware } from './middleware/referrer-policy.middleware';

// Do not use the `synchronize: true` in production. better to use a migrations tool with docker
@Module({
  imports: [
    ConfigModule.forRoot(),
    NewsArticlesModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReferrerPolicyMiddleware, LoggerMiddleware).forRoutes('*');
  }
}

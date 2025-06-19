import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from '@cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from '@common/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CatsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}

import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CatsModule,
  ],
})
export class AppModule {}

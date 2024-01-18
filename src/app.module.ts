import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from '../db/data-source';
import { UserModule } from './users/users.module';
import { APP_SERVICE_PROVIDER_KEY } from './constants/providerKeys';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
  ],
  providers: [],
})
export class AppModule {}

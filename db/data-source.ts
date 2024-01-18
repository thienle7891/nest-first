import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('NEST_APP_DATABASE_HOST'),
  port: +configService.get('NEST_APP_DATABASE_PORT'),
  username: configService.get('NEST_APP_DATABASE_USERNAME'),
  password: configService.get('NEST_APP_DATABASE_PASSWORD'),
  database: configService.get('NEST_APP_DATABASE_NAME'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  // migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

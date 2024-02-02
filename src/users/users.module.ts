import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import {
  APP_FB,
  STORE_SERVICE,
  USER_SERVICE_PROVIDER_KEY,
} from 'src/constants/providerKeys';
import { StoreConfig } from 'src/store/store.config';
import { StoreService } from 'src/store/store.service';
import { StoreModule } from 'src/store/store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtStrategy } from './authentication/authentication.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticationHelper } from './authentication/authentication.helper';

const createStore = (config: StoreConfig): StoreService => {
  console.log('config', config);
  return new StoreService();
};
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthenticationModule,
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
          signOptions: {
            expiresIn: config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
          },
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    { provide: USER_SERVICE_PROVIDER_KEY, useClass: UserService },
    AuthenticationHelper,
    JwtStrategy,
    // {
    //   provide: APP_FB,
    //   useValue: storeConfig as StoreConfig,
    // },
    // {
    //   provide: STORE_SERVICE,
    //   useFactory: createStore,
    //   inject: [
    //     {
    //       token: APP_FB,
    //       optional: true,
    //     },
    //   ],
    // },
  ],
})
export class UserModule {}

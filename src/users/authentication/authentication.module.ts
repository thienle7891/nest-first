import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { AuthenticationController } from './authentication.controller';
import { User } from '../entities/user.entity';
import { AuthenticationService } from './authentication.service';
import { AuthenticationHelper } from './authentication.helper';
import { JwtStrategy } from './authentication.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
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
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationHelper, JwtStrategy],
})
export class AuthenticationModule {}

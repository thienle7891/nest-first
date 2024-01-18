import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

import { Request } from 'express';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtAuthenticationGuard
  extends AuthGuard('jwt')
  implements IAuthGuard
{
  public handleRequest(err: unknown, user: User): any {
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { user }: any = context.switchToHttp().getRequest();

    return user ? true : false;
  }
}

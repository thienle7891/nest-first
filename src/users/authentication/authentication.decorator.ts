import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User as UserModel } from '../entities/user.entity';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as UserModel;
});

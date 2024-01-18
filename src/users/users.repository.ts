import { UserDto } from './users.dto';

export class UserRepository {
  createUser(user: any) {
    user.id = 1;
    user.createdAt = new Date();
    user.updatedAt = new Date();
    const userReal = UserDto.plainToClass(user);
    return userReal;
  }
}

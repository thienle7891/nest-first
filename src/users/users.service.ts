import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { apiErrors } from 'src/constants/constant.error';
import { encodePassword } from 'src/utils/encode.helper';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  public async createUser(body: CreateUserDto): Promise<{ success: boolean }> {
    const { name, username, password, role } = body;
    console.log('body', body);
    const user = await this.repository.findOne({
      where: {
        username,
      },
    });
    if (user) {
      throw new HttpException(apiErrors.USERNAME_EXIST, HttpStatus.CONFLICT);
    }
    const currentUser = new User();
    currentUser.name = name;
    currentUser.username = username;
    currentUser.password = encodePassword(password);
    currentUser.role = role ? role : 'end-user';
    await this.repository.save(currentUser);
    return { success: true };
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        user_id: id,
      },
    });
    if (!user) {
      throw new HttpException(apiErrors.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }
    delete user.password;
    delete user.user_id;

    return user;
  }
}

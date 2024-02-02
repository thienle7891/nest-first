import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { apiErrors } from '../../constants/constant.error';
import { User } from '../entities/user.entity';
import { AuthenticationHelper } from './authentication.helper';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginResponseDto } from './dto/response.login.dto';
import { TResType } from 'src/types/TResType';

@Injectable()
export class AuthenticationService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthenticationHelper)
  private readonly helper: AuthenticationHelper;

  public async register(body: RegisterDto): Promise<TResType | never> {
    const { name, username, password, role }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { username } });

    if (user) {
      throw new HttpException(apiErrors.USERNAME_EXIST, HttpStatus.CONFLICT);
    }
    user = new User();
    user.name = name;
    user.username = username;
    user.password = this.helper.encodePassword(password);
    user.role = role;
    const saveUser = await this.repository.save(user);
    return { success: true, data: saveUser };
  }

  public async login(body: LoginDto): Promise<LoginResponseDto | never> {
    const { username, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException(apiErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new HttpException(apiErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return { token: this.helper.generateToken(user) };
  }

  public async refresh(user: User): Promise<LoginResponseDto> {
    return { token: this.helper.generateToken(user) };
  }
}

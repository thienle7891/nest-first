import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  // HttpException,
  // HttpStatus,
  // UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from '../entities/user.entity';

@Injectable()
export class AuthenticationHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // public async decode(token: string): Promise<unknown> {
  //   return this.jwt.decode(token, null);
  // }

  public async validateUser(decoded: any): Promise<User> {
    return this.repository.findOne({ where: { user_id: decoded.id } });
  }

  public generateToken(user: User): string {
    return this.jwt.sign({ id: user.user_id, username: user.username });
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  public async getUserByToken(token: string): Promise<User | never> {
    const decoded: unknown = this.jwt.verify(token);
    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: User = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

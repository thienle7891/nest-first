import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Injectable,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './users.dto';
import { ModuleRef } from '@nestjs/core';
import { UserService } from './users.service';
import { USER_SERVICE_PROVIDER_KEY } from 'src/constants/providerKeys';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthenticationGuard } from './authentication/authentication.guard';
import { JwtStrategy } from './authentication/authentication.strategy';
import { AuthenticationHelper } from './authentication/authentication.helper';
import { User } from './entities/user.entity';

@Controller('users')
@Injectable()
export class UserController {
  constructor(
    @Inject(USER_SERVICE_PROVIDER_KEY)
    private readonly userService: UserService,
    @Inject(AuthenticationHelper)
    private readonly helper: AuthenticationHelper
  ) {}

  @Get()
  getAllUsers() {
    return [{ name: 'Thien' }, { name: 'Thien 2' }, { name: 'Thien 3' }];
  }

  // @Post()
  // createUser(@Body() user: CreateUserDto): <{success: boolean} | never> {
  //   return this.userService.createUser(user);
  // }

  // @Get(':id')
  // @UseGuards(JwtAuthenticationGuard)
  // getUserById(@Param('id', ParseUUIDPipe) id: string) {
  //   // console.log('1', this.strategy.getIdByToken());
  //   return this.userService.getUserById(id);
  // }
  @Get('one')
  @UseGuards(JwtAuthenticationGuard)
  async getUser(@Req() request: Request): Promise<User> {
    const user = request['user'];
    return this.userService.getUserById(user['user_id']);
  }
}

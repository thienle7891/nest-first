import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserDto } from './users.dto';
import { ModuleRef } from '@nestjs/core';
import { UserService } from './users.service';
import { USER_SERVICE_PROVIDER_KEY } from 'src/constants/providerKeys';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE_PROVIDER_KEY) private readonly userService: UserService
  ) {}

  @Get()
  getAllUsers() {
    return [{ name: 'Thien' }, { name: 'Thien 2' }, { name: 'Thien 3' }];
  }

  @Post()
  createUser(@Body() user: CreateUserDto): any {
    return this.userService.createUser(user);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return 'success';
  }
}

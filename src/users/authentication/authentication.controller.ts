import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  // UseGuards,
  // Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { User } from '../entities/user.entity';
// import { JwtAuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginResponseDto } from './dto/response.login.dto';
import { TResType } from 'src/types/TResType';

@ApiTags('authentication')
@Controller('api/auth')
export class AuthenticationController {
  @Inject(AuthenticationService)
  private readonly service: AuthenticationService;

  @ApiOkResponse({ status: 200, type: User })
  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto): Promise<TResType | never> {
    return this.service.register(body);
  }

  @ApiOkResponse({ status: 200, type: LoginResponseDto })
  @Post('login')
  private login(@Body() body: LoginDto): Promise<LoginResponseDto | never> {
    return this.service.login(body);
  }

  // @ApiOkResponse({ status: 200, type: LoginResponseDto })
  // @Post('refresh')
  // @UseGuards(JwtAuthenticationGuard)
  // private refresh(@Req() { body }: Request): Promise<LoginResponseDto | never> {
  //   return this.service.refresh(<User>);
  // }
}

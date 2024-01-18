import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../entities/user.entity';
import { BaseDto } from 'src/common/base.dto';

export class CreateUserDto extends BaseDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  public readonly password: string;

  @ApiProperty()
  @IsString()
  public readonly username: string;

  @ApiProperty()
  @IsString()
  public readonly name: string;

  @ApiProperty()
  @IsOptional()
  public readonly role?: Role;
}

import {
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  Matches,
  Equals,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Role, Roles } from 'src/users/entities/user.entity';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(/^[^\s]+$/, { message: 'Whitespace is not allowed' })
  public readonly password: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(/^[^\s]+$/, { message: 'Whitespace is not allowed' })
  public readonly confirm_password: string;

  @ApiProperty()
  @Matches(/^[^\s]+$/, { message: 'Whitespace is not allowed' })
  @IsString()
  public readonly username: string;

  @ApiProperty()
  @IsString()
  public readonly name: string;

  @ApiProperty()
  @IsEnum(Roles)
  @IsOptional()
  public readonly role: Role;
}

import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Role, Roles } from 'src/users/entities/user.entity';

export class RegisterDto {
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
  @IsEnum(Roles)
  @IsOptional()
  public readonly role: Role;
}

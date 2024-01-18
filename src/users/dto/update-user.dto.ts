import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Role, Roles } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsOptional()
  public readonly username: string;

  @ApiProperty()
  @IsOptional()
  public readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Roles)
  public readonly role?: Role;
}

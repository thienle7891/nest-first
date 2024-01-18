import { Trim } from 'class-sanitizer';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @Trim()
  @IsString()
  public readonly username: string;

  @ApiProperty()
  @IsString()
  public readonly password: string;
}

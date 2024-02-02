import { Trim } from 'class-sanitizer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { NOT_WHITESPACE } from 'src/constants/regex';
import { validateErrors } from 'src/constants/constant.error';

export class LoginDto {
  @ApiProperty()
  @Trim()
  @IsString()
  @Matches(NOT_WHITESPACE, { message: validateErrors.NOT_WHITESPACE })
  public readonly username: string;

  @ApiProperty()
  @IsString()
  @Matches(NOT_WHITESPACE, { message: validateErrors.NOT_WHITESPACE })
  public readonly password: string;
}

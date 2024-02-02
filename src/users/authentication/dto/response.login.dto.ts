import { ApiProperty } from '@nestjs/swagger';

import { User } from 'src/users/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty()
  public readonly token: string;

  // @ApiProperty()
  // public readonly user: User;
}

import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class UserDto extends BaseDto {
  @IsNotEmpty({ message: 'Please provide a name.' })
  @Expose()
  username: string;

  @IsNotEmpty({ message: 'Please provide a password.' })
  @Expose()
  password: string;
}

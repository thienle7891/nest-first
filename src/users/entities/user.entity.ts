import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type Role = 'admin' | 'end-user';
export const Roles: Role[] = ['admin', 'end-user'];

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @ApiProperty()
  @Column({ type: 'text' })
  username: string;

  @ApiProperty()
  @Column({ type: 'text' })
  name: string;

  @ApiProperty()
  @Column({ nullable: false })
  @Exclude()
  password: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['admin', 'end-user'],
    default: 'end-user',
  })
  role: Role;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}

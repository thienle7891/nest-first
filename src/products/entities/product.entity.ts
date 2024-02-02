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
import { type } from 'os';

export type Role = 'admin' | 'end-user';
export const Roles: Role[] = ['admin', 'end-user'];
export type TagGroup = 'back-end' | 'front-end' | 'qc' | 'infra' | 'other';
export const TagGroups: TagGroup[] = [
  'back-end',
  'front-end',
  'infra',
  'qc',
  'other',
];
@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @ApiProperty()
  @Column({ type: 'text' })
  name: string;

  @ApiProperty()
  @Column({ type: 'text' })
  username: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['back-end', 'front-end', 'infra', 'qc', 'other'],
    default: 'other',
  })
  tag_group: TagGroup;

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

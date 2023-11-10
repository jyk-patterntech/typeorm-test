// server/src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 512, unique: true })
  email: string;

  @Column({ length: 512 })
  name: string;

  @Column({ name: 'alias_name', length: 512, unique: true })
  aliasName: string;

  @Column({ name: 'phone_num', length: 512 })
  phoneNum: string;

  @Column({ name: 'birth_day', length: 512 })
  birthDay: string;

  @Column({ length: 512 })
  affiliation: string;

  @Column({ length: 512 })
  salt: string;

  @Column({ length: 512 })
  password: string;

  @CreateDateColumn({ name: 'creation_at' })
  creationAt: Date;

  @Column()
  deletedBy: number;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
// users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('USER') // 테이블 이름과 동일하게 설정
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

  // @Column({ name: 'birth_day', length: 512 })
  // birthDay: string;

  @Column({ length: 512 })
  affiliation: string;

  // @Column({ length: 512 })
  // salt: string;

  // @Column({ length: 512 })
  // password: string;

  @CreateDateColumn({ name: 'creation_at', default: ()=> "CURRENT_TIMESTAMP" })
  creationAt: Date;

  @Column({ name: 'deleted_by', nullable: true })
  deletedBy: number;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}

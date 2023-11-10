// character/character.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('CHARACTER') // 테이블 이름과 동일하게 설정
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name:'round_id' })
  roundId: number;

  @Column({ name: 'role_type',length: 512 })
  roleType: string;

  @Column({ length: 512 })
  name: string;

  @Column({ name: 'image_path', length: 512 })
  imagePath: string;

}

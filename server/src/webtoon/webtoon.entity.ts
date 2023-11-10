// webtoon/webtoon.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('WEBTOON') // 테이블 이름과 동일하게 설정
export class Webtoon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id', nullable: true })
  categoryId: number;

  @Column({ name: 'image_path', length: 512 })
  imagePath: string;

  @Column({ length: 512 })
  language: string;

  @Column({ length: 512 })
  rate: string;

  @Column({ name: 'created_by' })
  createdBy: number;

  @CreateDateColumn({ name: 'creation_at', default: ()=> "CURRENT_TIMESTAMP" })
  creationAt: Date;

  @Column({ name: 'deleted_by', nullable: true })
  deletedBy: number;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @Column({ name: 'valid_release_plan_id' })
  validReleasePlanId: number;
}

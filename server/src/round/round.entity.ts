// round/round.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Webtoon } from '../webtoon/webtoon.entity'

@Entity('ROUND') // 테이블 이름과 동일하게 설정
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'webtoon_id' })
  webtoonId: number;

  @Column({ name: 'round_number'})
  roundNumber: number;

  @Column({ length: 512 })
  title: string;

  @Column()
  responsible: number;

  @Column({ name: 'script_file_path', length: 512 })
  scriptFilePath: string;

  @Column({ name: 'created_by' })
  createdBy: number;

  @CreateDateColumn({ name: 'creation_at', default: ()=> "CURRENT_TIMESTAMP" })
  creationAt: Date;

  @Column({ name: 'deleted_by', nullable: true })
  deletedBy: number;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(()=> Webtoon)
  @JoinColumn({ name:'webtoonId', referencedColumnName: 'id'})
}

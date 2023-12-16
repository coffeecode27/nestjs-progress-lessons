import { ISession } from 'connect-typeorm';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

// membuat entity untuk tabel class typeorm menyimpan data session dalam database
// dan kita juga harus implement sebuah interface "Isession" dari module "connect-typeorm"
@Entity({ name: 'sessions' })
export class SessionEntity implements ISession {
  @Index()
  @Column('bigint')
  expiredAt = Date.now();

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  destroyedAt?: Date;

  @PrimaryColumn('varchar', { length: 255 })
  id = '';

  @Column({ type: 'text' })
  json: string;
}

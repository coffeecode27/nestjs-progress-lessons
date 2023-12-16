// membuat entiti
// satu class entiti akan mewakilkan satu tabel beserta kolom-kolomnya didalam database kita

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'user_id' }) // autogenerate atau auto incremement
  id: number;

  @Column({ nullable: false, default: '' })
  username: string;

  @Column({ nullable: false, default: '' })
  email: string;

  @Column({ nullable: false, default: '' })
  password: string;
}

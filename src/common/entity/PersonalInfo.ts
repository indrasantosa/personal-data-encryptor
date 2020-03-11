import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { uuid } from 'uuidv4';
import { PersonalFile } from './PersonalFile';

@Entity()
export class PersonalInfo {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  hashedEncryptionKey: string;

  @OneToOne(type => PersonalFile, { eager: true })
  @JoinColumn()
  file: PersonalFile;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @BeforeInsert()
  beforeInsert() {
    this.id = uuid();
  }
}

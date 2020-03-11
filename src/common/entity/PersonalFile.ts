import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity()
export class PersonalFile {
  @PrimaryColumn()
  id: string;

  @Column()
  fileName: string;

  @Column()
  type: string;

  @Column()
  encryptedContent: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @BeforeInsert()
  beforeInsert() {
    this.id = uuid();
  }
}

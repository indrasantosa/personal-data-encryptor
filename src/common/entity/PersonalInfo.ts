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
  label: string;

  @Column()
  encryptedContent: string;

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

  toJson() {
    const { id, label, createDate, updateDate, file } = this;
    return {
      id,
      label,
      createDate,
      updateDate,
      file: {
        id: file.id,
        fileName: file.fileName
      }
    };
  }
}

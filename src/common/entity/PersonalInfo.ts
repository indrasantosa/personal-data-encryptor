import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { uuid } from 'uuidv4';
import { createHash } from 'crypto';
import { PersonalFile } from './PersonalFile';
import { encryptString, decryptString } from '../utils/encrypt';
import { InfoShare } from './InfoShare';

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

  @OneToMany(
    type => InfoShare,
    infoShare => infoShare.personalInfo
  )
  shareLinks: InfoShare[];

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

  setEncryptionKey(encryptionKey: string) {
    const hash = createHash('sha256');
    this.hashedEncryptionKey = hash.update(encryptionKey).digest('base64');
  }

  verifyEncryptionKey(encryptionKey = '') {
    const hash = createHash('sha256');
    return (
      this.hashedEncryptionKey === hash.update(encryptionKey).digest('base64')
    );
  }

  /**
   * Encrypt stringify user data
   * @param {string} userInfo - stringified user data
   */
  encryptContent(userInfo: string, encryptionKey: string) {
    const hash = createHash('sha256');
    this.encryptedContent = encryptString(encryptionKey, userInfo);
    this.hashedEncryptionKey = hash.update(encryptionKey).digest('base64');
  }

  /**
   * Decrypt stored user data
   * @param {string} userInfo - stringified user data
   */
  decryptContent(encryptionKey: string) {
    return decryptString(encryptionKey, this.encryptedContent);
  }
}

import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { uuid } from 'uuidv4';
import { encryptString, decryptString } from '../utils/encrypt';
import { PersonalInfo } from './PersonalInfo';

export enum ShareType {
  onetime,
  multi
}

@Entity()
export class InfoShare {
  @PrimaryColumn()
  id: string;

  @Column()
  salt: string;

  @Column({ nullable: true })
  encryptedKey: string;

  @Column()
  type: ShareType;

  @Column({ nullable: true })
  expiryDate: Date;

  @Column()
  active: boolean;

  @Column()
  fileDownloadUsed: boolean;

  @ManyToOne(
    type => PersonalInfo,
    personalInfo => personalInfo.shareLinks,
    { eager: true }
  )
  personalInfo: PersonalInfo;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @BeforeInsert()
  beforeInsert() {
    this.id = uuid();
    this.active = true;
    this.fileDownloadUsed = false;
  }

  getShareToken(encryptionKey: string) {
    const shareToken = uuid();
    this.salt = uuid();
    this.encryptedKey = encryptString(this.salt + shareToken, encryptionKey);
    return shareToken;
  }

  getEncryptionToken(shareToken: string) {
    return decryptString(this.salt + shareToken, this.encryptedKey);
  }
}

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
import { encryptString } from '../utils/encrypt';
import { PersonalInfo } from './PersonalInfo';

export enum ShareType {
  onetime,
  multi
}

@Entity()
export class InfoShare {
  @PrimaryColumn()
  id: string;

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
    personalInfo => personalInfo.shareLinks
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
    this.encryptedKey = encryptString(this.id + shareToken, encryptionKey);
    return shareToken;
  }
}

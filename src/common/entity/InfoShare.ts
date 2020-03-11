import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { uuid } from 'uuidv4';

export enum ShareType {
  onetime,
  multi
}

@Entity()
export class InfoShare {
  @PrimaryColumn()
  id: string;

  @Column()
  label: string;

  @Column()
  type: ShareType;

  @Column({ nullable: true })
  expiryDate: Date;

  @Column()
  active: boolean;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @BeforeInsert()
  beforeInsert() {
    this.id = uuid();
  }
}

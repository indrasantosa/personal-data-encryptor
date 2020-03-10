import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { uuid } from 'uuidv4';
import { IsEmail } from 'class-validator';

@Entity()
export class Account {
  @PrimaryColumn()
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  salt: string;

  @Column()
  hashedPassword: string;

  @Column()
  createDate: Date;

  @Column({ nullable: true })
  updateDate: Date;

  @BeforeInsert()
  beforeInsert() {
    this.id = uuid();
    this.createDate = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updateDate = new Date();
  }
}

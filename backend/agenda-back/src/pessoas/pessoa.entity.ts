import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  profession: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  whatsappNumber: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  photoUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

}

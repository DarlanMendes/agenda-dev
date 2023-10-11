import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable:false})
  username: string;

  @Column({nullable:false})
  email: string;

  @Column({ type: 'date', nullable: false })
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

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
  lat:number

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
  lng: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

}

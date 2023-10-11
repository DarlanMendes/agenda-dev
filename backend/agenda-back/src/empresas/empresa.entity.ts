import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  razaoSocial: string;

  @Column()
  nomeFantasia: string;

  @Column({nullable:false})
  email: string;

  @Column({nullable:false})
  cnpj: string;

  @Column()
  responsavel: string;

  @Column()
  whatsappNumber: string;

  @Column()
  celular: string;

  @Column()
  telefoneFixo: string;

  @Column({nullable:false})
  endereco: string;

  @Column()
  logoUrl: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
  lat:number

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
  lng: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

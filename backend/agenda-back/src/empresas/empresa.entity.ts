import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  razaoSocial: string;

  @Column()
  nomeFantasia: string;

  @Column()
  email: string;

  @Column()
  cnpj: string;

  @Column()
  responsavel: string;

  @Column()
  whatsappNumber: string;

  @Column()
  celular: string;

  @Column()
  telefoneFixo: string;

  @Column()
  endereco: string;

  @Column()
  logoUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

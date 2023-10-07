import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './pessoas/pessoa.entity';
import { ConfigModule } from '@nestjs/config';
import { PessoaModule } from './pessoas/pessoa.module';
import { EmpresaModule } from './empresas/empresa.module';
import { Empresa } from './empresas/empresa.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
      entities: [Pessoa, Empresa],
      synchronize: true, 
    }),
    PessoaModule,
    EmpresaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

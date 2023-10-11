import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  

  // Configurar opções do CORS
  const corsOptions: CorsOptions = {
    origin: '*',//'http://localhost:3000', // ou '*' para permitir de qualquer origem
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  app.enableCors(corsOptions);
  await app.listen(3001);
}
bootstrap();

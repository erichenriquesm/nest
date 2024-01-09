import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import * as ormconfig from '../../ormconfig.js'; // Caminho para o seu arquivo de configuração TypeORM

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig)],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { attributeProviders } from './attribute.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AttributeController],
  providers: [AttributeService, ...attributeProviders],
})
export class AttributeModule {}

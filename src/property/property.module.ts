import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PropertyEntity } from 'src/entities/property.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PropertyEntity]),
    AuthModule,
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})

export class PropertyModule {}

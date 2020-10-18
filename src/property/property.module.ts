import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PropertyEntity } from 'src/entities/property.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CommentEntity } from 'src/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PropertyEntity,
      UserEntity,
      CommentEntity
    ]),
    AuthModule,
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})

export class PropertyModule {}

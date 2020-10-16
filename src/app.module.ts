import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommentModule } from 'src/comment/comment.module';
import { PropertyModule } from 'src/property/property.module';
import { RatingModule } from 'src/rating/rating.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    AuthModule,
    CommentModule,
    PropertyModule,
    RatingModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}

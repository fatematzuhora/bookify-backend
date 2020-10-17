import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { AuthModule } from 'src/auth/auth.module';
import { CommentModule } from 'src/comment/comment.module';
import { PropertyModule } from 'src/property/property.module';
import { RatingModule } from 'src/rating/rating.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
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

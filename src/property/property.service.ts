import {
    ConflictException, InternalServerErrorException, Injectable, Inject,
    UnauthorizedException, Logger
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto } from 'src/models/property.model';
import { PropertyEntity } from 'src/entities/property.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CommentEntity } from 'src/entities/comment.entity';

@Injectable()
export class PropertyService {
    private logger = new Logger('PropertyService');

    constructor(
        @InjectRepository(PropertyEntity) private propertyRepo: Repository<PropertyEntity>,
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(CommentEntity) private commentRepo: Repository<CommentEntity>,
    ) {}

    async create(
        data: CreatePropertyDto
    ): Promise<any> {
        try {
            const property = this.propertyRepo.create(data);
            await property.save();
            
            return { ...property.toJSON() };

        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException();
        }
    }
}
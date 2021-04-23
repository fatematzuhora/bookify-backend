import {
    InternalServerErrorException, Injectable, Logger
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto, PropertyFilterDto, PropertyResponse } from 'src/models/property.model';
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

    async findAll(
        user: UserEntity
    ): Promise<PropertyResponse[]> {
        const findOptions = {
            where: {user: user}
        };

        return (await this.propertyRepo.find(findOptions)).map(property =>
            property.toProperty(user),
        );
    }

    async create(
        user: UserEntity,
        data: CreatePropertyDto
    ): Promise<PropertyResponse> {
        try {
            const property = this.propertyRepo.create(data);
            property.user = user;

            const { slug } = await property.save();

            return (await this.propertyRepo.findOne({ slug })).toProperty(user);

        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async searchProperty(
        filter: PropertyFilterDto
    ): Promise<PropertyResponse[]> {
        const { type, country, city } = filter;

        let findOptions: any = {
            where: {},
        };
        if (type) {
            findOptions.where.type = type;
        }
        if (country) {
            findOptions.where.country = country;
        }
        if (city) {
            findOptions.where.city = city;
        }

        try {
            return (await this.propertyRepo.find(findOptions)).map(property =>
                property.toProperty()
            );
        } catch (e) {
            this.logger.error(`Failed to search properties. Filter: ${JSON.stringify(filter)}`, e.stack);
            throw new InternalServerErrorException();
        }
    }
}
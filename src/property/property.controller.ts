import { Body, Controller, Get, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto, PropertyFilterDto, PropertyResponse } from 'src/models/property.model';
import { PropertyService } from 'src/property/property.service';
import { UserEntity } from 'src/entities/user.entity';
import { User } from 'src/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ResponseObject } from 'src/models/response.model';

@Controller('property')
export class PropertyController {
    constructor(
        private propertyService: PropertyService
    ) {}

    @Get()
    @UseGuards(AuthGuard())
    async findAll(
        @User() user: UserEntity
    ): Promise<
        ResponseObject<'properties', PropertyResponse[]> &
        ResponseObject<'propertyCount', number>
    > {
        const properties = await this.propertyService.findAll(user);
        return {
            properties,
            propertyCount: properties.length,
        };
    }

    @Post()
    @UseGuards(AuthGuard())
    async create(
        @User() user: UserEntity,
        @Body(ValidationPipe) data: CreatePropertyDto
    ): Promise<ResponseObject<'property', PropertyResponse>> {
        const property = await this.propertyService.create(user, data);
        return { property };
    }

    @Get('/search')
    async searchProperty (
        @Query(ValidationPipe) filterDto: PropertyFilterDto
    ): Promise<
        ResponseObject<'properties', PropertyResponse[]> &
        ResponseObject<'propertyCount', number>
    > {
        const properties = await this.propertyService.searchProperty(filterDto);
        return {
            properties,
            propertyCount: properties.length,
        };
    }
}

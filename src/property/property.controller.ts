import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from 'src/models/property.model';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
    constructor(
        private propertyService: PropertyService
    ) {}

    @Post()
    create(@Body(ValidationPipe) credentials: CreatePropertyDto): Promise<any> {
        return this.propertyService.create(credentials);
    }
}

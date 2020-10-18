import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export enum PropertyType {
    SINGLE = 'single',
    DOUBLE = 'double'
}

export class CreatePropertyDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsEnum(PropertyType)
    type: PropertyType;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    city: string;
}
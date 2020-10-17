import { IsString, IsNotEmpty } from 'class-validator';

export enum PropertyType {
    SINGLE = 'single',
    DOUBLE = 'double'
}

export class CreatePropertyDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    city: string;
}
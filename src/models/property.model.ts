import { IsEnum, IsIn, IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { UserResponse } from './user.model';

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

export interface PropertyResponse {
    slug: string;
    title: string;
    description: string;
    price: number;
    type: PropertyType;
    country: string;
    city: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    user: UserResponse;
}

export interface FindFeedQuery {
    limit?: number;
    offset?: number;
}
  
export interface FindAllQuery extends FindFeedQuery {
    user?: string;
    rated?: string;
}

export class PropertyFilterDto {
    @IsOptional()
    @IsIn([PropertyType.SINGLE, PropertyType.DOUBLE])
    type: PropertyType;
 
    @IsOptional()
    @IsNotEmpty()
    country: string;

    @IsOptional()
    @IsNotEmpty()
    city: string;
}
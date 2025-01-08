import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
 export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    inventory: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    categoryId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    userId: number;
 }
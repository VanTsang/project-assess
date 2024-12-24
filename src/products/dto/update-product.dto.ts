import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
 export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    inventory: number;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
 }
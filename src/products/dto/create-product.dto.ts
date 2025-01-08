import { IsString, IsNumber, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateProductDto {
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
    userId: number;
   
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    categoryId: number;

}

import { IsString, IsNumber, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';



export class CreateProductDto {
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
    userId: number;
   
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

}

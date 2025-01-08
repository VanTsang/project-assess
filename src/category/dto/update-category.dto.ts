import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber,IsOptional, IsNotEmpty } from "class-validator";

export class UpdateCategoryDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    parentId: number;
}
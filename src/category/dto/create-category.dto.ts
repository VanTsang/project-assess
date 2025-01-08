import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt,IsOptional, IsNotEmpty } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    parentId?: number;
}
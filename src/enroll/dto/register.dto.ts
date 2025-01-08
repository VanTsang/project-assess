import { IsString, MinLength, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class RegisterDto {
    @IsString()
    @ApiProperty()
    username: string

    @IsString()
    @MinLength(6)
    @ApiProperty()
    password: string

    @IsEmail()
    @ApiProperty()
    email: string
}

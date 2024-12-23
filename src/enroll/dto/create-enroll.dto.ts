import { IsString, MinLength, IsEmail } from "class-validator";
export class CreateEnrollDto {
    @IsString()
    username: string

    @IsString()
    @MinLength(6)
    password: string

    @IsEmail()
    email: string
}

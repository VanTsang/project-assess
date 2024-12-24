import { IsString, MinLength, IsEmail } from "class-validator";
export class LoginDto {
    
    @IsString()
    @MinLength(6)
    password: string

    @IsEmail()
    email: string
}

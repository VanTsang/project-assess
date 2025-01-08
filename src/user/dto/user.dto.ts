// 引入类验证装饰器
import { IsEmail, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
// 定义创建用户的Dto类
export class CreateUserDto {
    @IsString()
    @ApiProperty()
    username: string;

    @IsString()
    @MinLength(6)
    @ApiProperty()
    password: string

    @IsEmail()
    @ApiProperty()
    email: string
}
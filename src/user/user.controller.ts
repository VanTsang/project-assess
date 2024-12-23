import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    //创建用户的post请求处理
    @Post()
    async create(
        @Body() createUserDto: {username: string; password: string; email: string}
    ) {
        //调用Userservice创建用户
        return this.userService.create(createUserDto)
    }
}

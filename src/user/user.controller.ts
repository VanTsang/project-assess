import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/enroll/jwt-enroll.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    //创建用户的post请求处理
    async create(
        @Body() createUserDto: {username: string; password: string; email: string}
    ) {
        //调用Userservice创建用户
        return this.userService.create(createUserDto)
    }
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiOperation({ summary: '获取用户信息' })
    @ApiResponse({status: 200, description: '获取成功'})
    @ApiResponse({status: 400, description: '获取失败'})
    async getProfile(@Request() req) {
        //通过req.user获取当前登录用户信息
        return this.userService.findByEmail(req.user.email)
    }
}

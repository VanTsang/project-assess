import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnrollService } from './enroll.service';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('enroll')
@ApiTags('enroll')
export class EnrollController {
  constructor(private readonly enrollService: EnrollService) {}

  //注册接口
  @Post('register')
  @ApiOperation({ summary: '注册' })
  @ApiResponse({ status: 200, description: '注册成功' })
  @ApiResponse({ status: 400, description: '注册失败' })
  async register(@Body() createEnrollDto: RegisterDto) {
    const {username, password, email} = createEnrollDto
    return this.enrollService.register(createEnrollDto)
  }

  //登录接口
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResponse({ status: 200, description: '登录成功' })
  @ApiResponse({ status: 400, description: '登录失败' })
  async login(@Body() body: LoginDto){
    const {email, password} = body
    return this.enrollService.login(body)
  }

}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnrollService } from './enroll.service';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';


@Controller('enroll')
export class EnrollController {
  constructor(private readonly enrollService: EnrollService) {}

  //注册接口
  @Post('register')
  async register(@Body() createEnrollDto: RegisterDto) {
    const {username, password, email} = createEnrollDto
    return this.enrollService.register(createEnrollDto)
  }

  //登录接口
  @Post('login')
  async login(@Body() body: LoginDto){
    const {email, password} = body
    return this.enrollService.login(body)
  }

}

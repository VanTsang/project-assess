import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnrollService } from './enroll.service';
import { CreateEnrollDto } from './dto/create-enroll.dto';


@Controller('enroll')
export class EnrollController {
  constructor(private readonly enrollService: EnrollService) {}

  //注册接口
  @Post('register')
  async register(@Body() createEnrollDto: CreateEnrollDto) {
    const {username, password, email} = createEnrollDto
    return this.enrollService.register(createEnrollDto)
  }

  //登录接口
  @Post('login')
  async login(@Body() body: {email: string, password: string}){
    return this.enrollService.login(body.email, body.password)
  }

}

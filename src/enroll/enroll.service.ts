import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//引入bcrypt库，用于密码加密
import * as bcryptjs from 'bcryptjs'
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { JwtPayload } from './jwt-payload.interface';
import { access } from 'fs';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class EnrollService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //用户注册 
  async register(createEnrollDto: CreateEnrollDto) {
    const { username, password, email } = createEnrollDto
    //使用bcrypt库对密码进行加密，生成哈希值
    const hashedPassword = await bcryptjs.hashSync(password, 15)
    //调用UserService的create方法，创建用户
    return this.userService.create({username, password: hashedPassword,email})
  }
  //用户登录
  async login(body: LoginDto) {
    const user = await this.userService.findByEmail(body.email)
    if (!user) {
      throw new Error('用户不存在')
    }
    const isMatch = await bcryptjs.compareSync(body.password, user.password)
    if (!isMatch){
      throw new Error('密码错误')
    }
    const payload: JwtPayload = {email: user.email, userId: user.id}//jwt载荷
    const token = this.jwtService.sign(payload)//生成jwt令牌
    return {access_token: token,userId: user.id}

  }
}

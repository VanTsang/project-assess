import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
@Injectable()
export class UserService {
    //构造函数注入PrismaService实例
    constructor(private prisma: PrismaService) {}

    //根据email查找用户
    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: {email}})
    }
    //创建用户
    async create(CreateUserDto: CreateUserDto){
        return this.prisma.user.create({
            data: CreateUserDto})
    }
    //获取所有用户
    async findAll() {
        return this.prisma.user.findMany()//使用prisma查询所有用户
    }
}

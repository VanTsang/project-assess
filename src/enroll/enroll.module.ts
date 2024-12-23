import { Module } from '@nestjs/common';
import { EnrollService } from './enroll.service';
import { EnrollController } from './enroll.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule,UserModule,JwtModule.register({ secret: process.env.JWT_SECRET,signOptions: {expiresIn: '36000000s'}})],
  controllers: [EnrollController],
  providers: [EnrollService,UserService],
})
export class EnrollModule {}

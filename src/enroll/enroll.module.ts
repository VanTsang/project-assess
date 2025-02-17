import { Module } from '@nestjs/common';
import { EnrollService } from './enroll.service';
import { EnrollController } from './enroll.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtAuthGuard } from './jwt-enroll.guard';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule,PrismaModule,UserModule,JwtModule.register({ secret: process.env.JWT_SECRET,signOptions: {expiresIn: '36000000s'}})],
  controllers: [EnrollController],
  providers: [EnrollService,UserService,JwtAuthGuard,JwtStrategy],
})
export class EnrollModule {}

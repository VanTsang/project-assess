import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnrollModule } from './enroll/enroll.module';
import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule,EnrollModule, ProductsModule, CategoryModule, UserModule,ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ProductsService],
})
export class AppModule {}

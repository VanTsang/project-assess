import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //配置全局管道
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
  .setTitle('Project')
  .setDescription('The Project Api DESCRIPTION')
  .setVersion('0.1')
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  // 启用 CORS,解决跨域问题
app.enableCors({
  origin: 'http://localhost:5173',  // 允许的域名访问
 methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
 allowedHeaders: 'Content-Type, Authorization',  // 允许的请求头
 credentials: true, // 允许携带认证信息
});

  await app.listen(process.env.PORT ?? 8080);

}



bootstrap();

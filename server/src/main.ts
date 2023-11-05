import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 전역 유효성 검사 파이프 설정
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // DTO에 정의되지 않은 속성을 제거
    forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 포함된 요청을 거부
    transform: true, // 요청의 payload를 DTO의 타입으로 변환
  }));
  await app.enableCors(); // backend,frontend 분리 후 제거
  await app.listen(3003);
}
bootstrap();

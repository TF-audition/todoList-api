import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // 이 경우 모든 엔드포인트는 /api/... 로 시작합니다

  app.enableCors({
    origin: 'http://localhost:3001', // 요청을 허용할 도메인
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    credentials: true, // 자격 증명(쿠키 등)을 포함한 요청 허용
  });

  await app.listen(8001);
}
bootstrap();

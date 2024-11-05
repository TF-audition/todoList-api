import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // 이 경우 모든 엔드포인트는 /api/... 로 시작합니다

  await app.listen(8001);
}
bootstrap();

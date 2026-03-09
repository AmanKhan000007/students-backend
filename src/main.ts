import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so React frontend can call this API
  app.enableCors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
});

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`\n🚀 Students API running at http://localhost:${port}`);
  console.log(`📋 Endpoints:`);
  console.log(`   GET    http://localhost:${port}/students`);
  console.log(`   GET    http://localhost:${port}/students/:id`);
  console.log(`   POST   http://localhost:${port}/students`);
  console.log(`   PATCH  http://localhost:${port}/students/:id`);
  console.log(`   DELETE http://localhost:${port}/students/:id\n`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from 'src/app.module';

import * as env from 'src/config/env.config';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  if (env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: function (origin, callback) {
        if (env.ORIGINS.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error(`Not allowed by CORS`), false);
        }
      },
      allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
      methods: 'GET,POST,PUT,PATCH,DELETE,UPDATE,OPTIONS',
      credentials: true,
    });
    logger.log(`Accepting requests from origin "${env.ORIGINS}"`);
  }
  
  const port = env.NODE_PORT;
  await app.listen(port);
  
  logger.log(`Application listening on port ${port}`);
}

bootstrap();

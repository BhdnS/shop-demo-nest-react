import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import * as cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AllExceptionFilter } from './filters'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      exposedHeaders: ['Authorization'],
      credentials: true,
    },
  })
  const configService = app.get(ConfigService)
  const port = configService.get('port') as string

  const config = new DocumentBuilder()
    .setTitle('Shop demo')
    .setDescription('The shop API description')
    .setVersion('1.0')
    .addBasicAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  })

  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new AllExceptionFilter())

  await app.listen(port)
}

bootstrap()

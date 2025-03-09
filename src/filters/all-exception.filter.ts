import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const message = exception.message

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    })
  }
}

export default AllExceptionFilter

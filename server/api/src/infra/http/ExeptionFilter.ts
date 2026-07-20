import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = "Internal server error";
    let errorName = "InternalServerError";

    // 🔹 Erros do Nest (HttpException)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === "string") {
        message = res;
      } else if (typeof res === "object") {
        message = (res as any).message || message;
        errorName = (res as any).error || errorName;
      }
    }

    // 🔹 Erros nativos (Error, Prisma, etc)
    else if (exception instanceof Error) {
      message = exception.message;
      errorName = exception.name;
    }

    // 🔹 Log interno (para debug)
    this.logger.error(
      `Error ${errorName} | ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    // 🔹 Resposta padrão para o cliente
    response.status(status).json({
      success: false,
      statusCode: status,
      error: errorName,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}

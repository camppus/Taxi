import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  RequestMethod,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
  requestId?: string;
  method: RequestMethod;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode = this.getStatusCode(exception);
    const message = this.getMessage(exception);
    const error = this.getError(exception);

    const errorResponse: ErrorResponse = {
      statusCode,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method as any as RequestMethod,
    };
    response.status(statusCode).json(errorResponse);
  }

  private getStatusCode(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return HttpStatus.BAD_REQUEST;
  }

  private getMessage(exception: unknown): string | string[] {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (
        typeof response === "object" &&
        response !== null &&
        "message" in response
      ) {
        return (response as any).message;
      }
      return exception.message;
    }

    if (exception instanceof Error) {
      if (process.env.NODE_ENV === "production") {
        return "Erro interno do servidor";
      }
      return exception.message;
    }

    return "Erro desconhecido";
  }

  private getError(exception: unknown): string {
    if (exception instanceof HttpException) {
      return exception.constructor.name.replace("Exception", "");
    }

    if (exception instanceof Error) {
      return exception.name;
    }

    return "InternalServerError";
  }
  private logError(
    exception: unknown,
    request: Request,
    errorResponse: ErrorResponse,
  ): void {
    const { method, url, ip } = request;

    const message =
      exception instanceof Error ? exception.message : "Unknown error";

    this.logger.error(
      `[${errorResponse.statusCode}] ${method} ${url} | ${message} | ${ip}`,
    );

    if (process.env.NODE_ENV !== "production" && exception instanceof Error) {
      this.logger.debug(exception.stack);
    }
  }
}

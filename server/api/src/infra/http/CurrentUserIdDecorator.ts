import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

const CurrentUserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = request?.user?.sub;
    if (!id) {
      throw new UnauthorizedException("precisas estar autenticado");
    }
    return id;
  },
);

export default CurrentUserId;

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const obj = {
      id: (request as any).user._id,
      firstName: (request as any).user.firstName,
      lastName: (request as any).user.lastName,
      email: (request as any).user.email,
    };
    return obj;
  },
);

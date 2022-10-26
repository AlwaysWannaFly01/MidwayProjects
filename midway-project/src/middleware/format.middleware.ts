import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

// 比如在 /api 返回的所有数据都是用统一的结构，减少 Controller 中的重复代码。
// 我们可以增加一个类似下面的中间件代码。

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      // 在 koa/egg 下，如果中间件中返回 null 值，会使得状态码变为 204，需要在中间件中显式额外赋值状态码。
      if (result === null) {
        ctx.status = 200;
      }
      return {
        code: 0,
        msg: 'OK',
        data: result,
      };
    };
  }

  match(ctx) {
    return ctx.path.indexOf('/api') !== -1;
  }
}

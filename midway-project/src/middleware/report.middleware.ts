import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

//使用 @Middleware 装饰器标识中间件
@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 控制器前执行的逻辑
      const startTime = Date.now();
      // 执行下一个 Web 中间件，最后执行到控制器
      // 这里可以拿到下一个中间件或者控制器的返回值
      const result = await next();
      // 控制器之后执行的逻辑
      ctx.logger.info(
        `Report in "src/middleware/report.middleware.ts", rt = ${
          Date.now() - startTime
        }ms`
      );
      // 返回给上一个中间件的结果
      return result;
    };
  }

  // 在中间件执行时，我们可以添加路由忽略的逻辑
  ignore(ctx: Context): boolean {
    // 下面的路由将忽略此中间件
    return (
      ctx.path === '/' || ctx.path === '/api/auth' || ctx.path === '/api/login'
    );
  }

  // 同理，也可以添加匹配的路由，只有匹配到的路由才会执行该中间件。
  // ignore 和 match 同时只有一个会生效。
  // match(ctx: Context): boolean {
  //   // 下面的匹配到的路由会执行此中间件
  //   if (ctx.path === '/api/index') {
  //     return true;
  //   }
  // }

  //这里的静态 getName 方法，用来指定中间件的名字，方便排查问题
  static getName(): string {
    return 'report';
  }
}

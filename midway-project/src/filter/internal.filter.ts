import { Catch } from '@midwayjs/decorator';
import { httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

// 通过 @Catch 装饰器我们可以定义某一类异常的处理程序，我们可以轻松的捕获某一类型的错误，做出处理，也可以捕获全局的错误，返回统一的格式。
@Catch(httpError.InternalServerErrorError)
export class InternalServerErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    return 'got 500 error, ' + err.message;
  }
}

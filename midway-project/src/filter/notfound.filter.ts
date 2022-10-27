import { Catch } from '@midwayjs/decorator';
import { httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

// 框架内部，如果未匹配到路由，会抛出一个 NotFoundError 的异常。通过异常处理器，我们可以自定义其行为。
// 比如跳转到某个页面，或者返回特定的结果
@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    // 404 错误会到这里
    ctx.redirect('/404.html');
  }
}

import { Controller, Get, Inject } from '@midwayjs/decorator';
import { ReportMiddleware } from '../middleware/report.middleware';
import { Context } from '@midwayjs/koa';
import { REQUEST_OBJ_CTX_KEY } from '@midwayjs/core';

// @Controller 装饰器告诉框架，这是一个 Web 控制器类型的类
// @Controller 装饰器的第二个参数，可以让我们方便的在某个路由分组之上添加中间件
@Controller('/', { middleware: [ReportMiddleware] })
export class HomeController {
  // 在 默认的请求作用域 中
  // 使用 @Inject 来注入对应的实例
  @Inject()
  ctx: Context;

  // @Get 装饰器告诉框架，被修饰的 home 方法，将被暴露为 / 这个路由，可以由 GET 请求来访问
  // 路由级别忽略 路由前缀
  @Get('/', { ignoreGlobalPrefix: true })
  // 在 @Get 、 @Post 等路由装饰器上都提供了 middleware 参数，方便对单个路由做中间件拦截
  @Get('/main', { middleware: [ReportMiddleware] })
  async home(): Promise<string> {
    // 整个方法返回了一个字符串，在浏览器中你会收到 text/plain 的响应类型，以及一个 200 的状态码。

    // 除了显式声明外，在拦截器或者装饰器设计的时候，由于我们无法得知用户是否写了 ctx 属性，还可以通过内置的 REQUEST_OBJ_CTX_KEY 字段来获取
    console.log('是否写了 ctx 属性 =>', this.ctx === this[REQUEST_OBJ_CTX_KEY]); // true
    this.ctx.setAttr('abc', {
      a: 1,
      b: 2,
    });
    const value = this.ctx.getAttr('abc');
    console.log('value', value);
    // 获取某个自定义 Logger 对应的上下文日志
    // console.log('info => log', this.ctx.getLogger('info'));

    return 'Hello Midwayjs!';
  }
}

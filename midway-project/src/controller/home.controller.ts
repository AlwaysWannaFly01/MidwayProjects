import { Controller, Get } from '@midwayjs/decorator';

// @Controller 装饰器告诉框架，这是一个 Web 控制器类型的类
@Controller('/')
export class HomeController {
  // @Get 装饰器告诉框架，被修饰的 home 方法，将被暴露为 / 这个路由，可以由 GET 请求来访问
  // 路由级别忽略 路由前缀
  @Get('/', { ignoreGlobalPrefix: true })
  @Get('/main')
  async home(): Promise<string> {
    // 整个方法返回了一个字符串，在浏览器中你会收到 text/plain 的响应类型，以及一个 200 的状态码。
    return 'Hello Midwayjs!';
  }
}

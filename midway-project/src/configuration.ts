import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { fnMiddleware } from './middleware/another.middleware';
import * as view from '@midwayjs/view-nunjucks';
import { WeatherErrorFilter } from './filter/weather.filter';
import { InternalServerErrorFilter } from './filter/internal.filter';

//configuration 文件是 Midway 的生命周期入口文件，承担了组件开关，配置加载和生命周期管理的作用

@Configuration({
  //就使用来导入（开启）组件的方法
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    view,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  // 在所有被依赖注入容器管理的类中，都可以使用 @App() 装饰器来获取 当前最主要 的 Application
  @App()
  app: koa.Application;

  async onReady() {
    // 全局中间件，就是对所有的路由生效的 Web 中间件
    // 需要在应用启动前，加入当前框架的中间件列表中，useMiddleware 方法，可以把中间件加入到中间件列表中
    // 可以同时添加多个中间件[ReportMiddleware, ReportMiddleware2]
    this.app.useMiddleware([ReportMiddleware, fnMiddleware]);

    // 把ReportMiddleware中间件添加到名为 fnMiddleware 的中间件之后
    this.app.getMiddleware().insertAfter(ReportMiddleware, 'fnMiddleware');

    // 可以使用 getMiddleware().getNames() 来获取当前中间件列表中的所有中间件名
    console.log('getNames =>', this.app.getMiddleware().getNames());

    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);

    // add filter
    this.app.useFilter([WeatherErrorFilter]);

    // 用于获取项目根目录路径。
    // console.log('getAppDir =>', this.app.getAppDir());
    // 用于获取项目 TypeScript 基础路径，默认开发中为 src 目录，编译后为 dist 目录。
    // console.log('getBaseDir =>', this.app.getBaseDir());
    // 获取当前项目环境。
    // console.log('getEnv =>', this.app.getEnv());
    // 获取当前全局依赖注入容器。
    // console.log('getApplicationContext =>', this.app.getApplicationContext());

    // 获取特定 key 配置
    // console.log('getConfig =>', this.app.getConfig('koa'));
    // 获取某个 Logger，不传参数，默认返回 appLogger
    // console.log('getLogger =>', this.app.getLogger());

    // 获取当前框架类型。已弃用
    // console.log('getFrameworkType =>', this.app.getFrameworkType());

    this.app.useFilter([
      InternalServerErrorFilter,
      DefaultErrorFilter,
      NotFoundFilter,
    ]);
  }
}

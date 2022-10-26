import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { fnMiddleware } from './middleware/another.middleware';
import * as view from '@midwayjs/view-nunjucks';
import { WeatherErrorFilter } from './filter/weather.filter';
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
  }
}

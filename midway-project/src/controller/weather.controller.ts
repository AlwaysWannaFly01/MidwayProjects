import { Controller, Get, Query, Inject } from '@midwayjs/decorator';
import { WeatherService } from '../service/weather.service';
// import { WeatherInfo } from '../interface';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class WeatherController {
  //这里使用 @Inject 装饰器注入 WeatherService，是 Midway 依赖注入的标准用法
  @Inject()
  weatherService: WeatherService;

  @Inject()
  ctx: Context;

  // 这里是装饰器，定义一个路由
  @Get('/weather')
  async getWeatherInfo(@Query('cityId') cityId: string): Promise<void> {
    // 这里是 http 的返回，可以直接返回字符串，数字，JSON，Buffer 等
    // return 'Hello Weather!';
    const result = await this.weatherService.getWeather(cityId);
    if (result) {
      console.log('result', result);
      await this.ctx.render('info', result.weatherinfo);
    }
  }
}

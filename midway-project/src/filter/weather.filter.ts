import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { WeatherEmptyDataError } from '../error/weather.error';

//当每次请求中获取到了 WeatherEmptyDataError 错误，会使用相同的返回值返回给浏览器，同时会在日志中记录原始的错误信息。
@Catch(WeatherEmptyDataError)
export class WeatherErrorFilter {
  async catch(err: WeatherEmptyDataError, ctx: Context) {
    ctx.logger.error(err);
    return '<html><body><h1>weather data is empty</h1></body></html>';
  }
}

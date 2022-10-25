import { Provide } from '@midwayjs/decorator';
import { makeHttpRequest } from '@midwayjs/core';
import { WeatherInfo } from '../interface';
import { WeatherEmptyDataError } from '../error/weather.error';

// 这里使用 @Provide 装饰器修饰类，便于后续 Controller 注入该类
@Provide()
export class WeatherService {
  async getWeather(cityId: string): Promise<WeatherInfo> {
    if (!cityId) {
      throw new WeatherEmptyDataError();
    }

    try {
      // makeHttpRequest 方法是 Midway 内置的 http 请求方法
      const result = await makeHttpRequest(
        //城市天气信息来自于中国中央气象台 API
        `http://www.weather.com.cn/data/sk/${cityId}.html`,
        {
          dataType: 'json',
        }
      );
      if (result.status === 200) {
        console.log('result.data', result.data);
        return result.data;
      }
    } catch (error) {
      throw new WeatherEmptyDataError(error);
    }
  }
}

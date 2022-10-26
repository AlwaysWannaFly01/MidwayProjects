import {
  Controller,
  Get,
  Query,
  //   HttpCode,
  //   SetHeader,
  //   Redirect,
  //   ContentType,
} from '@midwayjs/decorator';
// import { User } from '../interface';
// import * as fs from 'fs';
// 使用装饰器参数忽略 路由前缀
@Controller('/api/user', { ignoreGlobalPrefix: true })
export class UserController {
  @Get('/')

  //通过 装饰器 来的设置响应的状态码
  //@HttpCode(201)

  //通过 装饰器 来简单的设置自定义响应头
  //   @SetHeader('x-bbb', '123')
  //   @Redirect('/login_check')
  //   @ContentType('html')
  async getUser(@Query('id') id: string): Promise<string> {
    console.log('id', id);
    // 返回 stream
    // return {
    //   id: 1,
    //   name: 'zs',
    //   age: 67,
    // };
    // 返回 stream
    return '<html><h1>Hello</h1></html>';
  }
}

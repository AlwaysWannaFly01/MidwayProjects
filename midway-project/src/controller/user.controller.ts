import {
  Controller,
  Get,
  Query,
  //   HttpCode,
  //   SetHeader,
  //   Redirect,
  //   ContentType,
  Inject,
  Provide,
} from '@midwayjs/decorator';
// import { User } from '../interface';
// import * as fs from 'fs';
import { UserService } from '../service/user.service';

//Controller 包含了 Provide 的功能。如果你不确定什么时候可以隐藏，可以都写上.
@Provide()
// 使用装饰器参数忽略 路由前缀
@Controller('/api/user', { ignoreGlobalPrefix: true })
export class UserController {
  // 在调用的代码处，使用 @Inject 装饰器注入你的服务
  // Inject 的类中，必须有对应的 @Provide 才会生效
  @Inject()
  userService: UserService;

  @Get('/')

  //通过 装饰器 来的设置响应的状态码
  //@HttpCode(201)

  //通过 装饰器 来简单的设置自定义响应头
  //   @SetHeader('x-bbb', '123')
  //   @Redirect('/login_check')
  //   @ContentType('html')
  async getUser(@Query('id') uid: any): Promise<any> {
    console.log('uid', uid);
    // 返回 stream
    // return {
    //   id: 1,
    //   name: 'zs',
    //   age: 67,
    // };
    // 返回 stream
    // return '<html><h1>Hello</h1></html>';
    const user = await this.userService.getUser({ uid });
    console.log('user', user);
    return {
      success: true,
      message: 'OK',
      data: user,
    };
  }
}

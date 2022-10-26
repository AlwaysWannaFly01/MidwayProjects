import { Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';

// 使用 @Provide 装饰器暴露你的服务
@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    // console.log('options', options);
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}

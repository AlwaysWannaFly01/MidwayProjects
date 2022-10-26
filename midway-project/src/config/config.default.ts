import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1666663671069_8834',
  koa: {
    port: 7001,
    //配置全局路由前缀,配置后，所有的路由都会自动增加该前缀
    globalPrefix: '/v1',
  },
  //指定为 nunjucks 模板
  view: {
    defaultViewEngine: 'nunjucks',
  },
} as MidwayConfig;

import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1666663671069_8834',
  koa: {
    port: 7001,
  },
  //指定为 nunjucks 模板
  view: {
    defaultViewEngine: 'nunjucks',
  },
} as MidwayConfig;

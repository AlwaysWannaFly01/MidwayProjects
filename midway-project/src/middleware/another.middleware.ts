// 支持函数中间件的形式，并且可以使用 useMiddleware 来加入到中间件列表
export async function fnMiddleware(ctx, next) {
  await next();
}

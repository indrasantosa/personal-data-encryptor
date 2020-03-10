import { Context, Next } from 'koa';
import { isFrontendRoutes } from '../../common/utils/routeUtil';

export default async (ctx: Context, next: Next) => {
  if (isFrontendRoutes(ctx.request.url)) {
    ctx.request.url = '/index.html';
  }
  await next();
};

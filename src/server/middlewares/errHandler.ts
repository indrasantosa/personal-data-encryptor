import { Context, Next } from 'koa';

export default async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
    switch (e.name) {
      case 'BadRequestError':
        ctx.status = 400;
        ctx.body = {
          message: e.message
        };
        break;
      default:
        ctx.status = 400;
        ctx.body = {
          message: e.message
        };
    }
  }
};

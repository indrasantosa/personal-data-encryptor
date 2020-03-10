import { Context, Next } from 'koa';
import axios from 'axios';
import path from 'path';

export default {
  create: async (ctx: Context, next: Next) => {
    console.log(ctx.request.body);
    console.log(ctx.request.files);
    ctx.body = 'Some things';
  }
};

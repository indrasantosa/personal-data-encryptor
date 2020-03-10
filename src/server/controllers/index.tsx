// import React from 'react';
// import { createReadStream } from 'fs';
// import path from 'path';
import { Context, Next } from 'koa';
import axios from 'axios';
// import ReactDOMServer from 'react-dom/server';

export default {
  HomePage: (ctx: Context, next: Next) => {
    ctx.type = 'html';
    ctx.body = 'end';
  }
};

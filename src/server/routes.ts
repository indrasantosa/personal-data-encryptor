import Router from 'koa-router';
import axios from 'axios';
import { APIRoutes } from '../common/enums/routes';
import Account from './controllers/account';

const createApplicationRouter = () => {
  const router = new Router();

  router.get(APIRoutes.fxList, async (ctx, next) => {
    const url = `${process.env.MAIN_APP_SERVER}${APIRoutes.fxList}`;
    const response = await axios.get(url, {
      params: ctx.query
    });
    ctx.type = 'application/json';
    ctx.body = JSON.stringify(response.data);
  });

  router.get(APIRoutes.cfdList, async (ctx, next) => {
    const url = `${process.env.MAIN_APP_SERVER}${APIRoutes.cfdList}`;
    const response = await axios.get(url, {
      params: ctx.query
    });
    ctx.type = 'application/json';
    ctx.body = JSON.stringify(response.data);
  });

  router.post(APIRoutes.account, Account.create);

  return router;
};

export default createApplicationRouter;

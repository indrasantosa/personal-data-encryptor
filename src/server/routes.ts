import Router from 'koa-router';
import { APIRoutes } from '../common/enums/routes';
import Account from './controllers/account';
import PersonalInfo from './controllers/personalInfo';

const createApplicationRouter = () => {
  const router = new Router();

  router.post(APIRoutes.account, Account.create);

  router.post(APIRoutes.personalInfo, PersonalInfo.create);
  router.get(APIRoutes.personalInfo, PersonalInfo.index);

  return router;
};

export default createApplicationRouter;

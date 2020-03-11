import { Context, Next } from 'koa';
import { getManager } from 'typeorm';
import { PersonalInfo } from '../../common/entity/PersonalInfo';
import { PersonalFile } from '../../common/entity/PersonalFile';
import { UnauthorizedError } from '../../common/utils/errors';

export default {
  create: async (ctx: Context, next: Next) => {
    const personalInfoRepository = getManager().getRepository(PersonalInfo);
    const personalFileRepository = getManager().getRepository(PersonalFile);

    try {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: {}
      };
    } catch (e) {
      throw new UnauthorizedError(e.message);
    }
  }
};

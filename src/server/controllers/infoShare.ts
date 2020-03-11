import { Context, Next } from 'koa';
import { getManager } from 'typeorm';
import { PersonalInfo } from '../../common/entity/PersonalInfo';
import { PersonalFile } from '../../common/entity/PersonalFile';
import { UnauthorizedError } from '../../common/utils/errors';
import { InfoShare, ShareType } from '../../common/entity/InfoShare';

export default {
  create: async (ctx: Context, next: Next) => {
    const infoShareRepository = getManager().getRepository(InfoShare);

    const newInfoShare = new InfoShare();
    newInfoShare.personalInfo = ctx.personalInfo;
    newInfoShare.type = ctx.request.body.type;
    newInfoShare.expiryDate = ctx.request.body.expiryDate;
    await infoShareRepository.save(newInfoShare);

    const shareToken = newInfoShare.getShareToken(
      ctx.request.body.encryptionKey
    );

    try {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: {
          shareToken,
          shareId: newInfoShare.id
        }
      };
    } catch (e) {
      throw new UnauthorizedError(e.message);
    }
  }
};

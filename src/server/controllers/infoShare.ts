import { Context, Next } from 'koa';
import { getManager } from 'typeorm';
import { PersonalInfo } from '../../common/entity/PersonalInfo';
import { PersonalFile } from '../../common/entity/PersonalFile';
import { UnauthorizedError, BadRequestError } from '../../common/utils/errors';
import { InfoShare, ShareType } from '../../common/entity/InfoShare';

export default {
  create: async (ctx: Context, next: Next) => {
    const infoShareRepository = getManager().getRepository(InfoShare);

    const newInfoShare = new InfoShare();
    newInfoShare.personalInfo = ctx.personalInfo;
    newInfoShare.type = ctx.request.body.type;
    newInfoShare.expiryDate = ctx.request.body.expiryDate;
    const shareToken = newInfoShare.getShareToken(
      ctx.request.body.encryptionKey
    );

    try {
      await infoShareRepository.save(newInfoShare);
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
  },
  retrieveData: async (ctx: Context, next: Next) => {
    const infoShareRepository = getManager().getRepository(InfoShare);
    const shareInfo: InfoShare = ctx.shareInfo;
    const encryptionToken = shareInfo.getEncryptionToken(
      ctx.request.body.shareToken
    );

    if (shareInfo.type === ShareType.onetime) {
      shareInfo.active = false;
      await infoShareRepository.save(shareInfo);
    }

    const decryptedString = shareInfo.personalInfo.decryptContent(
      encryptionToken
    );

    try {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: {
          label: shareInfo.personalInfo.label,
          secret: JSON.parse(decryptedString)
        }
      };
    } catch (e) {
      throw new UnauthorizedError(e.message);
    }
  },
  getShareId: async (ctx: Context, next: Next) => {
    const infoShareRepository = getManager().getRepository(InfoShare);

    const shareId = ctx.params.shareId;

    const shareInfo = await infoShareRepository.findOne(shareId);
    if (!shareInfo) {
      throw new BadRequestError('Share link not found');
    }
    ctx.shareInfo = shareInfo;
    await next();
  },
  verifyShareKey: async (ctx: Context, next: Next) => {
    const payload = ctx.request.body;
    const shareInfo: InfoShare = ctx.shareInfo;
    const encryptionToken = shareInfo.getEncryptionToken(payload.shareToken);

    if (!shareInfo.personalInfo.verifyEncryptionKey(encryptionToken)) {
      throw new UnauthorizedError('Share token or id is not correct');
    }
    await next();
  },
  verifyExpiry: async (ctx: Context, next: Next) => {
    const shareInfo: InfoShare = ctx.shareInfo;

    if (shareInfo.expiryDate && shareInfo.expiryDate < new Date()) {
      throw new BadRequestError('Share link has been expired');
    }
    if (!shareInfo.active) {
      throw new BadRequestError('Share link has been used');
    }
    await next();
  }
};

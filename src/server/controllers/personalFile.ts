import { Context, Next } from 'koa';
import { PersonalFile } from '../../common/entity/PersonalFile';
import { UnauthorizedError } from '../../common/utils/errors';
import { decryptFile } from '../../common/utils/encrypt';

export default {
  retrieve: async (ctx: Context, next: Next) => {
    const file: PersonalFile = ctx.personalInfo.file;

    const responseStream = decryptFile(
      ctx.request.body.encryptionKey,
      file.encryptedContent
    );
    try {
      ctx.status = 200;
      ctx.set('Content-disposition', `attachment; filename="${file.fileName}"`);
      ctx.body = responseStream;
    } catch (e) {
      throw new UnauthorizedError(e.message);
    }
  }
};

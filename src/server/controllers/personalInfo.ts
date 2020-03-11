import { Context, Next } from 'koa';
import { getManager } from 'typeorm';
import { createHash } from 'crypto';
import { encryptFile } from '../../common/utils/encrypt';
import { PersonalInfo } from '../../common/entity/PersonalInfo';
import { PersonalFile } from '../../common/entity/PersonalFile';
import { BadRequestError } from '../../common/utils/errors';

export default {
  index: async (ctx: Context, next: Next) => {
    const personalInfoRepository = getManager().getRepository(PersonalInfo);
    try {
      const result = await personalInfoRepository.find();
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        result: result
      };
    } catch (e) {
      throw e;
    }
  },
  create: async (ctx: Context, next: Next) => {
    const hash = createHash('sha256');
    const personalInfoRepository = getManager().getRepository(PersonalInfo);
    const personalFileRepository = getManager().getRepository(PersonalFile);

    const files = ctx.request.files;
    const newPersonalInfoPayload: Partial<PersonalInfo> = ctx.request.body;

    const newPersonalFile = new PersonalFile();
    if (files && files.file) {
      const file = files.file;
      const fileBuffer = await encryptFile('password', files.file);
      console.log('FileBuffer: ', fileBuffer);

      newPersonalFile.fileName = file.name;
      newPersonalFile.type = file.type;
      newPersonalFile.encryptedContent = fileBuffer.toString('base64');
      await personalFileRepository.save(newPersonalFile);
    }

    const newPersonalInfo = personalInfoRepository.create(
      newPersonalInfoPayload
    );

    try {
      newPersonalInfo.hashedEncryptionKey = hash
        .update(ctx.request.body.encryptionKey)
        .digest('base64');
      newPersonalInfo.file = newPersonalFile;
      const insertedRow = await personalInfoRepository.save(newPersonalInfo);
      const {
        firstName,
        lastName,
        id,
        createDate,
        updateDate,
        file
      } = insertedRow;
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: {
          id,
          firstName,
          lastName,
          createDate,
          updateDate,
          file: {
            id: file.id,
            fileName: file.fileName
          }
        }
      };
    } catch (e) {
      throw new BadRequestError(e.message);
    }
  }
};

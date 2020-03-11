import { Context, Next } from 'koa';
import { getManager } from 'typeorm';
import { createHash } from 'crypto';
import { encryptFile, encryptString } from '../../common/utils/encrypt';
import { PersonalInfo } from '../../common/entity/PersonalInfo';
import { PersonalFile } from '../../common/entity/PersonalFile';
import { BadRequestError } from '../../common/utils/errors';
import { PersonalInfoForm } from '../../common/redux/screens/createPersonalInfo/types';

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
    const newPersonalInfoPayload: PersonalInfoForm = ctx.request.body;

    const newPersonalFile = new PersonalFile();
    if (files && files.file) {
      const file = files.file;
      const fileBuffer = await encryptFile('password', files.file);

      newPersonalFile.fileName = file.name;
      newPersonalFile.type = file.type;
      newPersonalFile.encryptedContent = fileBuffer.toString('base64');
      await personalFileRepository.save(newPersonalFile);
    }

    const newPersonalInfo = new PersonalInfo();
    newPersonalInfo.label = newPersonalInfoPayload.label;
    newPersonalInfo.encryptedContent = encryptString(
      newPersonalInfoPayload.encryptionKey,
      JSON.stringify({
        firstName: newPersonalInfoPayload.firstName,
        lastName: newPersonalInfoPayload.lastName
      })
    );

    try {
      newPersonalInfo.hashedEncryptionKey = hash
        .update(ctx.request.body.encryptionKey)
        .digest('base64');
      newPersonalInfo.file = newPersonalFile;
      const insertedRow = await personalInfoRepository.save(newPersonalInfo);
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: insertedRow.toJson()
      };
    } catch (e) {
      throw new BadRequestError(e.message);
    }
  }
};

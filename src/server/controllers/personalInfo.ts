import { Context, Next } from 'koa';
import { getManager } from 'typeorm';
import fs from 'fs';
import { encryptFile } from '../../common/utils/encrypt';
import { PersonalInfo } from '../../common/entity/PersonalInfo';
import { PersonalFile } from '../../common/entity/PersonalFile';
import { BadRequestError, UnauthorizedError } from '../../common/utils/errors';
import { PersonalInfoForm } from '../../common/redux/screens/createPersonalInfo/types';

export default {
  index: async (ctx: Context, next: Next) => {
    const personalInfoRepository = getManager().getRepository(PersonalInfo);
    try {
      const result = await personalInfoRepository.find();
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        result: result.map(info => info.toJson())
      };
    } catch (e) {
      throw e;
    }
  },
  create: async (ctx: Context, next: Next) => {
    const personalInfoRepository = getManager().getRepository(PersonalInfo);
    const personalFileRepository = getManager().getRepository(PersonalFile);

    const files = ctx.request.files;
    const newPersonalInfoPayload: PersonalInfoForm = ctx.request.body;

    const newPersonalFile = new PersonalFile();
    if (files && files.file) {
      const file = files.file;
      console.log(files.file);
      const fileStream = fs.createReadStream(file.path);
      const encryptedFile = await encryptFile(
        newPersonalInfoPayload.encryptionKey,
        fileStream
      );

      newPersonalFile.fileName = file.name;
      newPersonalFile.type = file.type;
      newPersonalFile.encryptedContent = encryptedFile;
      await personalFileRepository.save(newPersonalFile);
    }

    const newPersonalInfo = new PersonalInfo();
    newPersonalInfo.label = newPersonalInfoPayload.label;
    newPersonalInfo.encryptContent(
      JSON.stringify({
        firstName: newPersonalInfoPayload.firstName,
        lastName: newPersonalInfoPayload.lastName
      }),
      newPersonalInfoPayload.encryptionKey
    );

    try {
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
  },
  retrieve: async (ctx: Context, next: Next) => {
    try {
      const secretPayload = ctx.personalInfo.decryptContent(
        ctx.request.body?.encryptionKey
      );
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: {
          label: ctx.personalInfo.label,
          secret: JSON.parse(secretPayload)
        }
      };
    } catch (e) {
      throw new BadRequestError(e.message);
    }
  },
  getPersonalInfoId: async (ctx: Context, next: Next) => {
    const personalInfoRepository = getManager().getRepository(PersonalInfo);

    const personalInfoId = ctx.params.personalInfoId;

    const personalInfo = await personalInfoRepository.findOne(personalInfoId);
    if (!personalInfo) {
      throw new BadRequestError('Personal Info ID not found');
    }
    ctx.personalInfo = personalInfo;
    await next();
  },
  verifyEncryptionKey: async (ctx: Context, next: Next) => {
    const payload = ctx.request.body;
    if (!ctx.personalInfo.verifyEncryptionKey(payload?.encryptionKey)) {
      throw new UnauthorizedError('Verification key is not correct');
    }
    await next();
  }
};

import { Cipher, Decipher, createCipher, createDecipher } from 'crypto';
import fs from 'fs';
import { File } from 'formidable';

const algorithm = 'aes-256-ctr';

export const encryptFile = (password: string, file: File): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const cipher = createCipher(algorithm, password);

    const fileStream = fs.createReadStream(file.path);
    const encryptedFileStream = fileStream.pipe(cipher);
    let buffer: Array<Buffer> = [];
    encryptedFileStream.on('readable', () => {
      let data = encryptedFileStream.read();
      while (data) {
        buffer.push(data);
        data = encryptedFileStream.read();
      }
    });
    encryptedFileStream.on('end', () => {
      // console.log(buffer.length);
      resolve(Buffer.concat(buffer));
    });
  });
};

export const getCipher = (password: string): Cipher => {
  return createCipher(algorithm, password);
};

export const getDecipher = (password: string): Decipher => {
  return createDecipher(algorithm, password);
};

export const encryptString = (
  password: string,
  payloadString: string
): string => {
  const cipher = createCipher(algorithm, password);
  const buffer = new Buffer(payloadString, 'utf8');
  return Buffer.concat([cipher.update(buffer), cipher.final()]).toString(
    'base64'
  );
};

export const decryptString = (
  password: string,
  payloadString: string
): string => {
  const decipher = createDecipher(algorithm, password);
  const buffer = new Buffer(payloadString, 'base64');
  return Buffer.concat([decipher.update(buffer), decipher.final()]).toString(
    'utf8'
  );
};

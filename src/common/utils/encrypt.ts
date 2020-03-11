import { createCipher, createDecipher } from 'crypto';

const algorithm = 'aes-256-ctr';
const Duplex = require('stream').Duplex;

export const encryptFile = (
  password: string,
  inputStream: any
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cipher = createCipher(algorithm, password);
    const encryptedFileStream = inputStream.pipe(cipher);
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
      resolve(JSON.stringify(buffer.map(buf => buf.toString('base64'))));
    });
  });
};

export const decryptFile = (password: string, encrpytedFile: string): any => {
  const decipher = createDecipher(algorithm, password);
  const encrpytedFileParts = JSON.parse(encrpytedFile).map(
    (part: string) => new Buffer(part, 'base64')
  );
  const stream = new Duplex();
  // eslint-disable-next-line array-callback-return
  encrpytedFileParts.map((bufferParts: Buffer): void => {
    stream.push(bufferParts);
  });
  stream.push(null);
  return stream.pipe(decipher);
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
